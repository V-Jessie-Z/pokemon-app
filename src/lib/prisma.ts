import { PrismaClient } from "@/generated/prisma"

// Create a global variable on the globalThis object to hold the PrismaClient instance
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
