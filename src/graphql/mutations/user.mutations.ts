import { User } from "@prisma/client";
import logger from "../../logger";
import { DateTime } from "luxon";
import { verifyEmail, verifyPassword } from "../../middleware/verify";
import {
  toDBUser,
  toExternalUser,
  UserDB,
  UserInput,
} from "../../utils/models";

type UserSrc = { email: string; password: string } & Partial<User>;

function flagMissingFields(data: any) {
  const requiredFields: (keyof User)[] = ["email"];
  return requiredFields.reduce((agg, key, i) => {
    if (!data[key]) agg.push(requiredFields[i]);
    return agg;
  }, [] as string[]);
}

/** create user record */
export async function createUser(dataSrc: UserSrc, UserDB: UserDB) {
  const created = DateTime.now().toUTC().toJSDate();
  const data = toDBUser({ created, ...dataSrc });
  let message = "Missing required fields";
  const missingFields = flagMissingFields(data);

  if (missingFields.length) {
    throw new Error(`${message} "${missingFields.join(", ")}"`);
  }

  message = "Invalid email";
  if (!verifyEmail(data.email!)) throw new Error(message);

  message = "Password is required";
  if (!data.password) throw new Error(message);

  message = `
  Password requires a minimum of 8 characters, including at least 1 uppercase, 1 lowercase letter, and 1 number, and may contain special characters
  `;
  if (!verifyPassword(data.password!)) throw new Error(message);

  const exists = await UserDB.findFirst({ where: { email: data.email } });
  if (exists) throw new Error("An account already exists with that email");

  return UserDB.create({ data: data as User })
    .then(toExternalUser)
    .catch((err: any) => {
      logger.error(err.toString());
      message = "User was not created. Please check your input and try again.";
      throw new Error(message);
    });
}

/** update user record with params */
export async function updateUser(params: UserInput, UserDB: UserDB) {
  const { id } = params;
  if (id === null) return null;
  const data = toDBUser(params);

  return UserDB.update({ where: { id }, data })
    .then(toExternalUser)
    .catch((err: any) => {
      logger.error(err.toString());
      const m = "The user was be updated: check your input and try again.";
      throw new Error(m);
    });
}

/** delete user record matching params */
export async function deleteUser({ id }: any, UserDB: UserDB) {
  return UserDB.delete({ where: { id } })
    .then(toExternalUser)
    .catch((err: any) => {
      logger.error(err.toString());
      throw new Error(`User id "${id}" was not be deleted`);
    });
}
