import { objectType } from "nexus";

/** `User` object (generates types and models) */
export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("lastSeen");
  }
});

// User exposed to API requests
export const UserExternal = objectType({
  name: "UserExternal",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("lastSeen");
  }
});
