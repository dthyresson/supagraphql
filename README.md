# supagraphql

GraphQL server using Supabase, GraphQL Helix, Envelop and Fastify

This example relies on the Supabase sample Countries data being loaded into the `countries` table.

## Envelop example with GraphQL-Helix

This example demonstrate how to implement the basic GraphQL [Envelop](https://github.com/dotansimha/envelop) flow with Envelop and [`graphql-helix`](https://github.com/contrawork/graphql-helix).

GraphQL-Helix provides a GraphQL execution flow, that abstract the HTTP execution, and allow you to easily support multiple transports, based on your needs.

This example uses the following Envelop plugins:

- [`useLogger`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-logger.ts) to log GraphQL lifecycle activity
- [`useExtendContext`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-extend-context.ts) to inject info into context, such as the authenticatiojn `access_token` JWT
- [`useGenericAuth`](https://github.com/dotansimha/envelop/tree/main/packages/plugins/generic-auth) implement a custom authentication flow that checks for the `@auth` directive on queries or mutations and a valid Supabase JWT. We'll use this to authenticate operations protected by RLS.
- [`useMaskedErrors`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-masked-errors.ts) to prevent sensitive information from leaking in error message responses
- [`useSchema`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-schema.ts) to load your GraphQL schema
- [`useTiming`](https://github.com/dotansimha/envelop/blob/main/packages/core/src/plugins/use-timing.ts) to inject timing traces for each phase

## Setup

1. Create new project on Supabase
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
2. Configure `.env` with your Supabase client `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_JWT_SECRET` from the Supabase API settings
3. `cd` into that folder,
4. To generate types, run `yarn gen`.
5. To start the server, run `yarn start`
6. Open http://localhost:3000/graphql in your browser, and try to run:

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

## Example Queries and Mutations

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

> note: This nutation requires an authenticated user, ie a valid Bearer JWT in the Authorization header.

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
{ "id": 1, "input": { "name": "foos", "iso2": "2" } }
```

#### Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM0MzQ0NTU1LCJzdWIiOiI0NWUyOWJiNS00NTA3LTQ0NTktOTFkNC03NDMxNDU0OGUzODkiLCJlbWFpbCI6ImR0aHlyZXNzb24rc2JnM0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.f050nI-sCynXBQ3vSkacUFQsQgumClmFpM5PuKe6hek"
}
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
