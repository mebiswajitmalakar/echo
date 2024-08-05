import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export const getPrisma = (): PrismaClient => {
  try {
    if (!prisma) {
      prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
      });
    }
  } catch (err) {
    console.log("error while connecting database");
    console.log(err);
  }

  return prisma as PrismaClient;
};
