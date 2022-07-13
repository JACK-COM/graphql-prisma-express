import { list, queryField, stringArg } from "nexus";
import { toExternalUser } from "../../utils/models";

// User Queries
export const getUser = queryField("getUser", {
  type: "UserExternal",
  args: { data: "UserQueryInput" },
  async resolve(_root, { data }, { Users }) {
    if (!data || (!data.id && !data.email)) return null;

    const { id, email } = data;
    if (id)
      return await Users.findFirst({ where: { id } }).then(toExternalUser);
    if (email)
      return await Users.findFirst({ where: { email } }).then(toExternalUser);
    return null;
  }
});

// Fetch a list of user
export const listUsers = queryField("listUsers", {
  type: list("UserExternal"),
  args: { email: stringArg() },
  async resolve(_root, { email }, { Users }) {
    if (!email) return [];
    const users = await Users.findMany({
      where: { email: { contains: email } }
    });
    return users.map(toExternalUser);
  }
});
