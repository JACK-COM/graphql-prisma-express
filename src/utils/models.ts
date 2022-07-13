import { PrismaClient, User } from "@prisma/client";
import { DateTime } from "luxon";

export type UserDB = PrismaClient["user"];
export type UserInput<T = Partial<User>> = { id?: User["id"] } & {
  [k in keyof T]: T[k] | null;
};

/** Create a `user` object that can be exposed via api */
export function toExternalUser(dbUser: User | null) {
  return dbUser
    ? {
        id: dbUser.id,
        email: dbUser.email,
        lastSeen: dbUser.lastSeen
          ? DateTime.fromJSDate(dbUser.lastSeen).toRelative() || "never"
          : "never"
      }
    : null;
}

/** Create a `user` object that can be exposed via api */
export function toDBUser(src: UserInput): Partial<User> {
  const requiredFields: (keyof User)[] = ["email"];
  const user = { email: src.email };
  const keys: (keyof User)[] = [...requiredFields, "id", "password", "created"];
  keys.forEach((key) => {
    if (src[key]) user[key] = src[key];
  });

  return user as Partial<User>;
}
