import { createUser, deleteUser, updateUser } from "../mutations";
import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { listUsers, userById, userByEmail } from "../queries";

/** `User` object (generates types and models) */
export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("lastSeen");
  },
});

// User exposed to API requests
export const UserExternal = objectType({
  name: "UserExternal",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("lastSeen");
  },
});

// Inputs used to create or update a user
export const UserParamsInput = objectType({
  name: "UserParamsInput",
  definition(t) {
    t.int("id");
    t.string("email");
    t.string("password");
  },
});

type UserParamsInput = {
  id?: number;
  email?: string;
  password?: string;
};

const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.int("id");
    t.string("email");
    t.string("password");
  },
});

const UserByIdInput = inputObjectType({
  name: "UserByIdInput",

  definition(t) {
    t.nonNull.int("id");
    t.string("email");
    t.string("password");
  },
});

// User Queries
export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    // Fetch a single user
    t.field("user", {
      type: "UserExternal",
      args: { data: UserUpdateInput },
      async resolve(_root, args, ctx) {
        const userDb = ctx.db.user;
        const { data } = args;
        if (data == null || Object.keys(data).length === 0) return null;

        const { id, email } = data;
        if (id) return await userById({ id }, userDb);
        if (email) return await userByEmail({ email }, userDb);
        return null;
      },
    });

    // Fetch a list of user
    t.nonNull.list.field("users", {
      type: "UserExternal",
      args: { email: stringArg() },
      async resolve(_root, args, ctx) {
        const userDb = ctx.db.user;
        return await listUsers(args, userDb);
      },
    });
  },
});

// User Mutations
export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    // Create a new user
    t.field("createUser", {
      type: "UserExternal",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const userDb = ctx.db.user;
        const result = await createUser(args, userDb);
        return result;
      },
    });

    // Update an existing user
    t.field("updateUser", {
      type: "UserExternal",
      args: { data: UserByIdInput },
      async resolve(_root, args, ctx) {
        const userDb = ctx.db.user;
        const { data } = args;
        if (!data) throw new Error("Please supply args");
        if (data.email === null || data.password === null)
          throw new Error("Please omit null args");

        const result = await updateUser(data, userDb);
        return result;
      },
    });

    // Delete an exising user
    t.field("deleteUser", {
      type: "UserExternal",
      args: { data: UserByIdInput },
      async resolve(_root, args, ctx) {
        const userDb = ctx.db.user;
        const { data } = args;
        const result = await deleteUser(data, userDb);
        return result;
      },
    });
  },
});
