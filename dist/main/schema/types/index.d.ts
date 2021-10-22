import { GraphQLResolveInfo } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Country = {
    __typename?: 'Country';
    continent?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    iso2: Scalars['String'];
    iso3?: Maybe<Scalars['String']>;
    local_name?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
export declare type CreateCountryInput = {
    continent?: Maybe<Scalars['String']>;
    iso2: Scalars['String'];
    iso3?: Maybe<Scalars['String']>;
    local_name?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
export declare type Credentials = {
    __typename?: 'Credentials';
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type Mutation = {
    __typename?: 'Mutation';
    createCountry: Country;
    deleteCountry: Country;
    signIn: User;
    signUp: User;
    updateCountry: Country;
};
export declare type MutationCreateCountryArgs = {
    input: CreateCountryInput;
};
export declare type MutationDeleteCountryArgs = {
    id: Scalars['Int'];
};
export declare type MutationSignInArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationSignUpArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationUpdateCountryArgs = {
    id: Scalars['Int'];
    input: UpdateCountryInput;
};
export declare type Query = {
    __typename?: 'Query';
    countries: Array<Country>;
    country: Country;
    hello: Scalars['String'];
};
export declare type QueryCountryArgs = {
    id: Scalars['Int'];
};
export declare type UpdateCountryInput = {
    continent?: Maybe<Scalars['String']>;
    iso2?: Maybe<Scalars['String']>;
    iso3?: Maybe<Scalars['String']>;
    local_name?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type User = {
    __typename?: 'User';
    access_token?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    id: Scalars['String'];
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Country: ResolverTypeWrapper<Country>;
    CreateCountryInput: CreateCountryInput;
    Credentials: ResolverTypeWrapper<Credentials>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    UpdateCountryInput: UpdateCountryInput;
    User: ResolverTypeWrapper<User>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    Boolean: Scalars['Boolean'];
    Country: Country;
    CreateCountryInput: CreateCountryInput;
    Credentials: Credentials;
    Int: Scalars['Int'];
    Mutation: {};
    Query: {};
    String: Scalars['String'];
    UpdateCountryInput: UpdateCountryInput;
    User: User;
};
export declare type AuthDirectiveArgs = {};
export declare type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export declare type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
    continent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    iso2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    iso3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    local_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type CredentialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credentials'] = ResolversParentTypes['Credentials']> = {
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    createCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationCreateCountryArgs, 'input'>>;
    deleteCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationDeleteCountryArgs, 'id'>>;
    signIn?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
    signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'password'>>;
    updateCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationUpdateCountryArgs, 'id' | 'input'>>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
    country?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<QueryCountryArgs, 'id'>>;
    hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
    Country?: CountryResolvers<ContextType>;
    Credentials?: CredentialsResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
};
export declare type DirectiveResolvers<ContextType = any> = {
    auth?: AuthDirectiveResolver<any, any, ContextType>;
};
//# sourceMappingURL=index.d.ts.map