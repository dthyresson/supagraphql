![supagraphql](https://raw.githubusercontent.com/dthyresson/supagraphql/main/docs/images/logo.png)

# supagraphql

**supagraphql** is an example GraphQL Server implemented using [Supabase](https://www.supabase.io), [GraphQL Helix](https://github.com/contrawork/graphql-helix), [Envelop](https://github.com/dotansimha/envelop) and [Fastify](https://www.fastify.io).

This example relies on the Supabase sample Countries data being loaded into the `countries` table and row-level-security (RLS) to secure mutations.

You can try a [demo](https://supagraphql-production.up.railway.app/graphql) at [https://supagraphql-production.up.railway.app/graphql](https://supagraphql-production.up.railway.app/graphql)

Or, if you want your own:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fdthyresson%2Fsupagraphql&envs=SUPABASE_URL%2CSUPABASE_KEY%2CSUPABASE_JWT_SECRET&SUPABASE_URLDesc=Supabase+Project+Url&SUPABASE_KEYDesc=Supabase+Anonymous+Key&SUPABASE_JWT_SECRETDesc=Supabase+JWT+Secret+to+verify+authentication)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dthyresson/supagraphql)

## Envelop and GraphQL-Helix

This example uses the following [Envelop](https://github.com/dotansimha/envelop) plugins:

- [`useLogger`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-logger.ts) to log GraphQL lifecycle activity
- [`useExtendContext`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-extend-context.ts) to inject info into context, such as the authenticatiojn `access_token` JWT
- [`useGenericAuth`](https://github.com/dotansimha/envelop/tree/main/packages/plugins/generic-auth) implement a custom authentication flow that checks for the `@auth` directive on queries or mutations and a valid Supabase JWT. We'll use this to authenticate operations protected by RLS.
- [`useMaskedErrors`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-masked-errors.ts) to prevent sensitive information from leaking in error message responses
- [`useSchema`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-schema.ts) to load your GraphQL schema
- [`enableInternalTracing`] to inject timing traces for each phase

## Setup

1. Create new project on [Supabase](https://www.supabase.io)
2. Create the Quick Start sample `Countries` data

![Countries Quick Start](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/countries_quick_start.png 'Countries Quick Start')

3. Or, create the `countries` table and data using the `sql/countries.sql` script

4. Since we want to secure the `countries` data, we'll use Row Level Security (RLS) and create the following policies so that everyone can read (SELECT), but only authenticated users can add (INSERT) or edit (UPDATE) -- and no one can delete:

```sql
--
-- Name: countries Enable access to all users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable access to all users" ON public.countries FOR SELECT USING (true);

--
-- Name: countries Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for authenticated users only" ON public.countries FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));

--
-- Name: countries Enable update for users based auth; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for users based auth" ON public.countries FOR UPDATE USING ((auth.role() = 'authenticated'::text)) WITH CHECK ((auth.role() = 'authenticated'::text));

--
-- Name: countries; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
```

> Note: these policies can be found in `sql.countries_rls.sql`

## Running the GraphQL Server

1. Install all dependencies from the root of the repo (using `yarn`)
1. Configure `.env` with your Supabase client `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_JWT_SECRET` from the Supabase API settings
1. `cd` into that folder,
1. To generate types, run `yarn gen`.
1. To start the server, run `yarn start`
1. Open http://localhost:3000/graphql in your browser, and try to run:

`query { hello }`

![Hello](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/query_hello.png 'Hello')

You should get the response back:

```json
{
  "data": {
    "hello": "Hello!"
  }
}
```

# Build and serve

If you deploy this project, you'll need to compile the typescript and build into `/dist`:

1. To build the typescripts into `dist`, run `yarn build`
1. To serve when deploying, run `yarn serve`

## Example Queries and Mutations

Queries can be performed by all users.

Mutations on countries are protected by Envelop's `generic auth` plugin that checks the Authorization header for a valid, unexpired and verified Bearer token. This is a JWT (JSON Web Token) set as the session, or returns as part of the Sign In.

> Note: The `SUPABASE_JWT_SECRET` is needed to verify the JWT.

### Get Countries

```ts
query COUNTRIES {
  countries {
    id
    name
    iso2
  }
}
```

#### Returns

![Countries](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/query_countries.png 'Countries')

### Get Country

```ts
query GET_COUNTRY($id: Int!) {
  country(id: $id) {
    id
    name
    iso2
    continent
  }
}
```

#### Variables

```json
{ "id": 234 }
```

#### Returns

![Country](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/query_country.png 'Country')

### Update a Country

> Note: This Mutation requires an authenticated user, ie a valid Bearer JWT in the Authorization header.

```ts
mutation UPDATE_COUNTRY($id: Int!, $input: UpdateCountryInput!) {
  updateCountry(id: $id, input: $input) {
    name
    iso2
    local_name
  }
}
```

#### Variables

```json
{ "id": 1, "input": { "name": "London is a Country", "iso2": "LIAC" } }
```

#### Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM0MzQ0NTU1LCJzdWIiOiI0NWUyOWJiNS00NTA3LTQ0NTktOTFkNC03NDMxNDU0OGUzODkiLCJlbWFpbCI6ImR0aHlyZXNzb24rc2JnM0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.f050nI-sCynXBQ3vSkacUFQsQgumClmFpM5PuKe6hek"
}
```

### Create a Country

> Note: This Mutation requires an authenticated user, ie a valid Bearer JWT in the Authorization header.

```ts
mutation ADD_COUNTRY($input: CreateCountryInput!) {
  createCountry(input: $input) {
    id
    name
    iso2
    continent
  }
}
```

#### Variables

```json
{
  "input": {
    "name": "In a Big Country",
    "iso2": "BIG"
  }
}
```

#### Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM0MzQ0NTU1LCJzdWIiOiI0NWUyOWJiNS00NTA3LTQ0NTktOTFkNC03NDMxNDU0OGUzODkiLCJlbWFpbCI6ImR0aHlyZXNzb24rc2JnM0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.f050nI-sCynXBQ3vSkacUFQsQgumClmFpM5PuKe6hek"
}
```

### Delete a Country

> Note: This Mutation requires an authenticated user, ie a valid Bearer JWT in the Authorization header.

```ts
mutation DELETE_COUNTRY($id: Int!) {
  deleteCountry(id: $id) {
    id
    name
    iso2
    continent
  }
}
```

#### Variables

```json
{
  "id": 92
}
```

#### Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM0MzQ0NTU1LCJzdWIiOiI0NWUyOWJiNS00NTA3LTQ0NTktOTFkNC03NDMxNDU0OGUzODkiLCJlbWFpbCI6ImR0aHlyZXNzb24rc2JnM0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.f050nI-sCynXBQ3vSkacUFQsQgumClmFpM5PuKe6hek"
}
```

### Get Countries for a Continent

```ts
query COUNTRIES_FOR_CONTINENT($continent: String!) {
  countriesForContinent(continent: $continent) {
    id
    name
    iso3
    continent
  }
}
```

#### Variables

```json
{ "continent": "Europe" }
```

### Sign Up

```ts
mutation SIGNUP($email: String!, $password: String!) {
  signUp(email: $email, password: $password) {
    id
    email
  }
}
```

#### Variables

```json
{ "email": "someone@example.com", "password": "12345678" }
```

### Sign In

```ts
mutation SIGNIN($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    id
    email
    access_token
  }
}
```

#### Variables

```json
{ "email": "someone@example.com", "password": "12345678" }
```

### GraphQL Code Generation

The command `yarn gen`

- Generates types from the SDL in typedefs
- Generates anintrospection schema in json format

You will want to regenerate types when modifying the schema (types or queries/mutations).
