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
export declare const getEnveloped: import("@envelop/core").GetEnvelopedFn<{
    [x: string]: any;
    [x: number]: any;
}>;
//# sourceMappingURL=envelop.d.ts.map