"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv-defaults/config");
exports.config = {
    graphQLEndpoint: process.env.GRAPHQL_ENDPOINT || '/graphql',
    port: process.env.PORT || 3000,
};
//# sourceMappingURL=config.js.map