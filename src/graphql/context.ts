import { PrismaClient } from "@prisma/client";

export interface GQLContext {
  db: PrismaClient;
}

export const context = {
  db: new PrismaClient(),
};
