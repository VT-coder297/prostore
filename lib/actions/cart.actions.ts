'use server';

import { cookies } from 'next/headers';
import { CartItem } from '@/types';
import { convertToPlainObject, formatError, round2 } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CartItemSchema, insertCartSchema } from '../validators';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();
    const item = CartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error('Product not found');

    if (!cart) {
      const prices = calcPrice([item]);
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...prices,
      });

      await prisma.cart.create({
        data: {
          ...newCart,
          // Force Decimal types for the initial create
          itemsPrice: new Prisma.Decimal(prices.itemsPrice),
          shippingPrice: new Prisma.Decimal(prices.shippingPrice),
          taxPrice: new Prisma.Decimal(prices.taxPrice),
          totalPrice: new Prisma.Decimal(prices.totalPrice),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      revalidatePath('/cart'); // Added this
      return { success: true, message: `${product.name} added to cart` };
    } else {
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId,
      );

      if (existItem) {
        if (product.stock < existItem.qty + 1)
          throw new Error('Not enough stock');
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId,
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error('Not enough stock');
        cart.items.push(item);
      }

      const prices = calcPrice(cart.items as CartItem[]);

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          // Force Decimal types for the update
          itemsPrice: new Prisma.Decimal(prices.itemsPrice),
          shippingPrice: new Prisma.Decimal(prices.shippingPrice),
          taxPrice: new Prisma.Decimal(prices.taxPrice),
          totalPrice: new Prisma.Decimal(prices.totalPrice),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      revalidatePath('/cart'); // Added this
      return { success: true, message: `${product.name} updated in cart` };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error('Cart session not found');

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  // NUCLEAR MOVE: Calculate prices LIVE instead of reading from DB
  const prices = calcPrice(cart.items as CartItem[]);

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: prices.itemsPrice, // Use the fresh calculation
    totalPrice: prices.totalPrice,
    shippingPrice: prices.shippingPrice,
    taxPrice: prices.taxPrice,
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found');

    const cart = await getMyCart();
    if (!cart) throw new Error('Cart not found');

    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId,
    );
    if (!exist) throw new Error('Item not found');

    if (exist.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== productId,
      );
    } else {
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    const prices = calcPrice(cart.items as CartItem[]);

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        itemsPrice: new Prisma.Decimal(prices.itemsPrice),
        shippingPrice: new Prisma.Decimal(prices.shippingPrice),
        taxPrice: new Prisma.Decimal(prices.taxPrice),
        totalPrice: new Prisma.Decimal(prices.totalPrice),
      },
    });

    revalidatePath(`/product/${product.slug}`);
    revalidatePath('/cart'); // Added this
    return { success: true, message: `${product.name} removed from cart` };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
