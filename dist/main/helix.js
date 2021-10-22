"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGraphQLRequest = void 0;
const graphql_helix_1 = require("graphql-helix");
const config_1 = require("./config");
const graphql_playground_html_1 = require("graphql-playground-html");
const envelop_1 = require("./envelop");
/**
 * handleGraphQLRequest uses Envelop and GraphQL-Helix
 * to handle the incoming GraphQL request and then
 * parse, validate, setup and extend the context (for authentication),
 * and execute (resolve) the query or mutation.
 *
 * It also will render the GraphQL playground,
 *
 * @param req Incoming request with a query or mutation
 * @param res Response contains GraphQL data.
 */
const handleGraphQLRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parse, validate, contextFactory, execute, schema } = envelop_1.getEnveloped({
        req,
    });
    const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
    };
    if (graphql_helix_1.shouldRenderGraphiQL(request)) {
        res.type('text/html');
        res.send(graphql_playground_html_1.renderPlaygroundPage({
            endpoint: config_1.config.graphQLEndpoint,
        }));
    }
    else {
        const { operationName, query, variables } = graphql_helix_1.getGraphQLParameters(request);
        const result = yield graphql_helix_1.processRequest({
            operationName,
            query,
            variables,
            request,
            schema,
            parse,
            validate,
            execute,
            contextFactory,
        });
        graphql_helix_1.sendResult(result, res.raw);
    }
});
exports.handleGraphQLRequest = handleGraphQLRequest;
//# sourceMappingURL=helix.js.map