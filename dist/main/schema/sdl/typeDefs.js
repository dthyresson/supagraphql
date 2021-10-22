"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
/**
 * The schema.
 *
 * Queries or Mutations that are protected and require
 * authentication are given the @auth directive,
 *
 * All others are public.
 *
 */
exports.typeDefs = graphql_tag_1.default `
  directive @auth on FIELD_DEFINITION

  type Country {
    id: Int!
    name: String!
    local_name: String
    continent: String
    iso2: String!
    iso3: String
  }

  input CreateCountryInput {
    name: String!
    iso2: String!
    iso3: String
    local_name: String
    continent: String
  }

  input UpdateCountryInput {
    name: String
    iso2: String
    iso3: String
    local_name: String
    continent: String
  }

  type Credentials {
    email: String!
    password: String!
  }

  type User {
    id: String!
    email: String!
    access_token: String
  }

  type Query {
    hello: String!
    country(id: Int!): Country!
    countries: [Country!]!
  }

  type Mutation {
    signUp(email: String!, password: String!): User!
    signIn(email: String!, password: String!): User!
    createCountry(input: CreateCountryInput!): Country! @auth
    deleteCountry(id: Int!): Country! @auth
    updateCountry(id: Int!, input: UpdateCountryInput!): Country! @auth
  }
`;
//# sourceMappingURL=typeDefs.js.map