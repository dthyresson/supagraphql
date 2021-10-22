"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const core_1 = require("@envelop/core");
const graphql_1 = require("graphql");
/*
 * Prevent unexpected error messages from leaking to the GraphQL clients.
 *
 * Unexpected errors are those that are not Envelop or GraphQL errors
 **/
const formatError = (err) => {
    if (err.originalError &&
        err.originalError instanceof core_1.EnvelopError === false &&
        err.originalError instanceof graphql_1.GraphQLError === false) {
        return new graphql_1.GraphQLError('Something went wrong.');
    }
    return err;
};
exports.formatError = formatError;
//# sourceMappingURL=errors.js.map