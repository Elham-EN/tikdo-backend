// Instantiate Prisma Client
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env['NODE_ENV'] || 'development'}` });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';

// Load environment-specific .env files
const connectionString = process.env['DATABASE_URL'];
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const adapter = new PrismaPg({ connectionString });
// Client user
const prisma = new PrismaClient({ adapter });

export { prisma };
