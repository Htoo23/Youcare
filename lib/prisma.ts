import { PrismaClient } from '@prisma/client'

// In Next.js, we need to ensure that we reuse the PrismaClient instance during
// development to prevent exhausting database connections. We attach it to
// `globalThis` so that hot reloading doesn’t create new clients on every change.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma