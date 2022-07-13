import { inputObjectType } from "nexus";

// Inputs used to create or update a user
export const UserInput = inputObjectType({
  name: "UserQueryInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("email");
    t.string("password");
  }
});

export const ResourceByIdInput = inputObjectType({
  name: "ResourceByIdInput",
  definition(t) {
    t.nonNull.int("id");
  }
});
