// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import pg from 'pg';
// import sampleData from './sample-data';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectionString = process.env.DATABASE_URL;

// // Для Neon обов'язково додаємо ssl: true
// const pool = new pg.Pool({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: false, // Це важливо для Neon
//   },
// });
// const adapter = new PrismaPg(pool);

// // Передаємо адаптер, як того вимагає помилка
// const prisma = new PrismaClient({ adapter });

// async function main() {
//   try {
//     console.log('Connecting to Neon...');
//     // Перевірка з'єднання перед запитом
//     await pool.query('SELECT 1');

//     console.log('Seeding data...');
//     await prisma.product.deleteMany({});

//     await prisma.product.createMany({
//       data: sampleData.products,
//     });

//     console.log('✅ Database seeded successfully');
//   } catch (error) {
//     console.error('❌ Error details:', error);
//   } finally {
//     await prisma.$disconnect();
//     await pool.end();
//   }
// }

// main();

import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';
import sampleData from './sample-data';
import dotenv from 'dotenv';

dotenv.config();

// Налаштування для Node.js середовища
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Ініціалізуємо Prisma з адаптером Neon
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log('Connecting to Neon via WebSockets...');

    // Очищення таблиці
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
    console.log('Old products cleared.');

    // Додавання нових даних
    await prisma.product.createMany({
      data: sampleData.products,
    });
    await prisma.user.createMany({
      data: sampleData.users,
    });

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
