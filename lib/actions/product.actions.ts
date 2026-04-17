'use server';
import { prisma } from '@/lib/prisma'; // Шлях до файлу, який ми створили вище
// import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '@/lib/utils';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';

// Отримання останніх товарів
export async function getLatestProducts() {
  console.log(
    'DEBUG: DATABASE_URL is:',
    process.env.DATABASE_URL ? 'FOUND' : 'MISSING',
  );
  try {
    const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return convertToPlainObject(data);
  } catch (error) {
    console.error('Помилка Prisma:', error);
    return [];
  }
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  });
}
