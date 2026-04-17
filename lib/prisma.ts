// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import pg from 'pg';

// const prismaClientSingleton = () => {
//   // 1. Setup the connection pool
//   const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

//   // 2. Initialize the adapter
//   const adapter = new PrismaPg(pool);

//   // 3. Pass the adapter to PrismaClient
//   return new PrismaClient({ adapter });
// };

// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Налаштування WebSocket для Neon
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  // В Prisma 7 при використанні адаптера Neon
  // передаємо ТІЛЬКИ адаптер.
  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          needs: { price: true },
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          needs: { rating: true },
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
