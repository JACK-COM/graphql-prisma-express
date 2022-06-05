import logger from "../../logger";
import { toExternalUser, UserDB } from "../../utils/models";

type UserQueryParams = {
  email?: string | null;
  id?: number | null;
};

/** List all user records matching params */
export async function listUsers({ email }: UserQueryParams, UserDB: UserDB) {
  const query = email
    ? () => UserDB.findMany({ where: { email } })
    : () => UserDB.findMany();

  const users = await query()
    .then((data: any) => {
      const mapped = data.map(toExternalUser);
      return mapped;
    })
    .catch((err: { message: any }) => {
      logger.error(err);
      return [];
    });

  return users;
}

/** find one user record matching params */
export async function userById({ id }: UserQueryParams, UserDB: UserDB) {
  if (!id) return null;

  return UserDB.findUnique({ where: { id } })
    .then(toExternalUser)
    .catch((e) => {
      logger.error(e.toString());
      return null;
    });
}

/** find one user record matching params */
export async function userByEmail({ email }: UserQueryParams, UserDB: UserDB) {
  if (!email) return null;

  return UserDB.findUnique({ where: { email } })
    .then(toExternalUser)
    .catch((e) => {
      logger.error(e.toString());
      return null;
    });
}
