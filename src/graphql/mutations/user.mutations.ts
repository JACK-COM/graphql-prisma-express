import { User } from "@prisma/client";
import { mutationField, nonNull, stringArg } from "nexus";
import { toExternalUser } from "../../utils/models";
// User Mutations

// Create a new user
export const createUser = mutationField("createUser", {
  type: "UserExternal",
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg())
  },
  async resolve(_root, { email, password }, { Users }) {
    const result = await Users.create({
      data: { email, password, created: new Date() }
    });
    return toExternalUser(result);
  }
});

// Update an existing user
export const updateUser = mutationField("updateUser", {
  type: "UserExternal",
  args: { data: "UserQueryInput" },
  async resolve(_root, { data }, { Users }) {
    if (!data) return null;

    const { id, ...rest } = data;
    if (Object.keys(rest).length === 0) return null;
    return await Users.update({
      data: rest as Partial<User>,
      where: { id }
    }).then(toExternalUser);
  }
});

// Delete an exising user
export const deleteUser = mutationField("deleteUser", {
  type: "UserExternal",
  args: { data: "ResourceByIdInput" },
  async resolve(_root, args, ctx) {
    const userDb = ctx.db.user;
    const { data } = args;
    const result = await deleteUser(data, userDb);
    return result;
  }
});
