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
export declare const handleGraphQLRequest: (req: any, res: any) => Promise<void>;
//# sourceMappingURL=helix.d.ts.map