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
exports.signIn = exports.signUp = void 0;
const graphql_1 = require("graphql");
const supabase_1 = require("../../lib/supabase");
/**
 * Supabase sign up via GraphQL Mutation
 *
 * @param email
 * @param password
 * @returns
 */
const signUp = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, error } = yield supabase_1.supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        throw new graphql_1.GraphQLError(`Unable to sign up: ${error.message}`);
    }
    return user;
});
exports.signUp = signUp;
/**
 /**
 * Supabase sign in via GraphQL Mutation.
 *
 * Provides a JWT access token to be used to authorize
 * subsequent GraphQL requests.
 *
 * @param email
 * @param password
 * @returns
 */
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, session, error } = yield supabase_1.supabase.auth.signIn({
        email,
        password,
    });
    if (error) {
        throw new graphql_1.GraphQLError(`Unable to sign in: ${error.message}`);
    }
    return Object.assign(Object.assign({}, user), { access_token: session === null || session === void 0 ? void 0 : session.access_token });
});
exports.signIn = signIn;
//# sourceMappingURL=authentication.js.map