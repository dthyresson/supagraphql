"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
/* Schema and Type Definitions */
const typeDefs_1 = require("./sdl/typeDefs");
const index_1 = require("./resolvers/index");
exports.schema = schema_1.makeExecutableSchema({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: index_1.resolvers,
});
//# sourceMappingURL=index.js.map