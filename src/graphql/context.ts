import { PrismaClient } from "@prisma/client";

export interface GQLContext {
  db: PrismaClient;
  Users: PrismaClient["user"];
}

const db = new PrismaClient();

export const context = {
  db,
  Users: db.user
};
