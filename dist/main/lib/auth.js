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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.resolveUserFn = exports.verifyToken = exports.setAccessToken = void 0;
const graphql_1 = require("graphql");
const jwt = __importStar(require("jsonwebtoken"));
const supabase_1 = require("../lib/supabase");
/**
 * Used by Envelop's useExtendContext to set the
 * access_token in context.
 *
 * @param context
 * @returns access_token
 */
const setAccessToken = (context) => {
    const headers = context.req['headers'] || {};
    if (headers['authorization']) {
        const authorization = headers['authorization'];
        const token = authorization.split(' ')[1];
        return { access_token: token };
    }
};
exports.setAccessToken = setAccessToken;
/**
 * Verifies and decodes the Supabase JWT.
 *
 * If the token is invalid, expired, etc then
 * verification will raise an error.
 *
 * @param token
 * @returns the decoded token
 */
const verifyToken = (token) => {
    if (!process.env.SUPABASE_JWT_SECRET) {
        console.error('SUPABASE_JWT_SECRET env var is not set.');
        throw new Error('SUPABASE_JWT_SECRET env var is not set.');
    }
    const secret = process.env.SUPABASE_JWT_SECRET;
    return jwt.verify(token, secret);
};
exports.verifyToken = verifyToken;
/**
 * Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
 * to find the current user.
 *
 * Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
 * Make sure to either return `null` or the user object.
 */
const resolveUserFn = (context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!context.access_token) {
            return null;
        }
        else {
            const session = exports.verifyToken(context.access_token);
            const user = session;
            return user;
        }
    }
    catch (e) {
        context.req['log'].error(e, 'Failed to validate token');
        throw new graphql_1.GraphQLError('Your credentials could not be verified. Please sign in again.');
    }
});
exports.resolveUserFn = resolveUserFn;
/**
 *  Here you can implement any custom to check if the user is valid and have access to the server.
 *  By using the `protect-auth-directive` mode, you'll also get 2 additional parameters:
 *  the resolver parameters as object and the DirectiveNode of the auth directive.
 *
 * We set the token on the supabase client to be used to authenticate subsequent requests
 */
const validateUser = (user, context) => __awaiter(void 0, void 0, void 0, function* () {
    // set the token to be used to authenticate subsequent requests
    supabase_1.supabase.auth.setAuth(context['access_token']);
    if (!user) {
        throw new graphql_1.GraphQLError("You don't have access to do that.");
    }
});
exports.validateUser = validateUser;
//# sourceMappingURL=auth.js.map