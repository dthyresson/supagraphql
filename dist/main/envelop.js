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
exports.getEnveloped = void 0;
const core_1 = require("@envelop/core");
const generic_auth_1 = require("@envelop/generic-auth");
const index_1 = require("./schema/index");
const auth_1 = require("./lib/auth");
const errors_1 = require("./lib/errors");
/**
 * getEnveloped uses Envelop to initialize plugins.
 *
 * Envelop provides a low-level hook-based plugin API for developers.
 * By combining plugins, we can compose our own GraphQL "framework",
 * and get a modified version of GraphQL with the capabilities we want:
 *
 * - Logging
 * - Setting Context
 * - Auth
 * - Masking Errors
 *
 */
exports.getEnveloped = core_1.envelop({
    plugins: [
        core_1.useSchema(index_1.schema),
        core_1.useExtendContext((contextSoFar) => __awaiter(void 0, void 0, void 0, function* () {
            return auth_1.setAccessToken(contextSoFar);
        })),
        generic_auth_1.useGenericAuth({
            resolveUserFn: auth_1.resolveUserFn,
            validateUser: auth_1.validateUser,
            mode: 'protect-auth-directive',
        }),
        core_1.useLogger(),
        core_1.useMaskedErrors({ formatError: errors_1.formatError }),
    ],
    enableInternalTracing: true,
});
//# sourceMappingURL=envelop.js.map