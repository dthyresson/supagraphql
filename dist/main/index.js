"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const fastify_1 = __importDefault(require("fastify"));
const config_1 = require("./config");
const helix_1 = require("./helix");
// Fastify with logger
const app = fastify_1.default({
    logger: { prettyPrint: true },
});
// We'll setup cors ...
app.register(Promise.resolve().then(() => __importStar(require('fastify-cors'))), {
    origin: true,
    credentials: true,
});
app.route({
    method: ['GET', 'POST'],
    url: '/',
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.code(200).send({ message: 'Supagraphql' });
        });
    },
});
// and just need a single route to handle GraphQL requests at
// the configured endpoint (/graphql).
// Note: We allow GET for the GraphQL playground, but all
// other GraphQL requests will be POSTs.
app.route({
    method: ['GET', 'POST'],
    url: config_1.config.graphQLEndpoint,
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // do the work of parsing, validating, executing
            // the GraphQL request and send back a result
            helix_1.handleGraphQLRequest(req, res);
            // Tell fastify a response was sent
            res.sent = true;
        });
    },
});
// and finally start up!
app.listen(config_1.config.port, () => {
    console.log(`GraphQL server is running at ${config_1.config.graphQLEndpoint} on port ${config_1.config.port}.`);
});
//# sourceMappingURL=index.js.map