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
exports.resolvers = void 0;
const authentication_1 = require("./authentication");
const country_1 = require("./country");
const hello_1 = require("./hello");
/**
 * Resolvers map to Queries and Mutations
 */
exports.resolvers = {
    Query: {
        hello: () => hello_1.hello(),
        country: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield country_1.country(id, context);
        }),
        countries: (context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield country_1.countries(context);
        }),
    },
    Mutation: {
        signUp: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield authentication_1.signUp(email, password);
        }),
        signIn: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield authentication_1.signIn(email, password);
        }),
        createCountry: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield country_1.createCountry({ input }, context);
        }),
        deleteCountry: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield country_1.deleteCountry({ id }, context);
        }),
        updateCountry: (_, { id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield country_1.updateCountry({ id, input }, context);
        }),
    },
};
//# sourceMappingURL=index.js.map