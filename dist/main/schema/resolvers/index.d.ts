/**
 * Resolvers map to Queries and Mutations
 */
export declare const resolvers: {
    Query: {
        hello: () => string;
        country: (_: any, { id }: {
            id: any;
        }, context: any) => Promise<import("../types").Country>;
        countries: (context: any) => Promise<[import("../types").Country]>;
    };
    Mutation: {
        signUp: (_: any, { email, password }: {
            email: any;
            password: any;
        }) => Promise<import("../types").User>;
        signIn: (_: any, { email, password }: {
            email: any;
            password: any;
        }) => Promise<import("../types").User>;
        createCountry: (_: any, { input }: {
            input: any;
        }, context: any) => Promise<import("../types").Country>;
        deleteCountry: (_: any, { id }: {
            id: any;
        }, context: any) => Promise<import("../types").Country>;
        updateCountry: (_: any, { id, input }: {
            id: any;
            input: any;
        }, context: any) => Promise<import("../types").Country>;
    };
};
//# sourceMappingURL=index.d.ts.map