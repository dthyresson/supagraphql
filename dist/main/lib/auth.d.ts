import { ResolveUserFn, ValidateUserFn } from '@envelop/generic-auth';
import * as jwt from 'jsonwebtoken';
import type { User } from '../schema/types';
/**
 * Used by Envelop's useExtendContext to set the
 * access_token in context.
 *
 * @param context
 * @returns access_token
 */
export declare const setAccessToken: (context: any) => {
    access_token: any;
};
/**
 * Verifies and decodes the Supabase JWT.
 *
 * If the token is invalid, expired, etc then
 * verification will raise an error.
 *
 * @param token
 * @returns the decoded token
 */
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
/**
 * Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
 * to find the current user.
 *
 * Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
 * Make sure to either return `null` or the user object.
 */
export declare const resolveUserFn: ResolveUserFn<User>;
/**
 *  Here you can implement any custom to check if the user is valid and have access to the server.
 *  By using the `protect-auth-directive` mode, you'll also get 2 additional parameters:
 *  the resolver parameters as object and the DirectiveNode of the auth directive.
 *
 * We set the token on the supabase client to be used to authenticate subsequent requests
 */
export declare const validateUser: ValidateUserFn<User>;
//# sourceMappingURL=auth.d.ts.map