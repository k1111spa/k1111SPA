import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Use standard PrismaClient - it works fine with PostgreSQL/Neon
  // The Neon adapter is only needed for specific serverless edge cases
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Cache the client globally to prevent creating multiple instances
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}
