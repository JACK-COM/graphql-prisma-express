import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as Queries from "./queries";
import * as Mutations from "./mutations";
import typeDefs from "./schema/schema.graphql";

export {}
// export const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers: {
//     Query: { ...Queries },
//     Mutation: { ...Mutations },
//   },
// });
