import type { User } from '../types/index';
/**
 * Supabase sign up via GraphQL Mutation
 *
 * @param email
 * @param password
 * @returns
 */
export declare const signUp: (email: string, password: string) => Promise<User>;
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
export declare const signIn: (email: string, password: string) => Promise<User>;
//# sourceMappingURL=authentication.d.ts.map