import {
  envelop,
  useExtendContext,
  useLogger,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import { useGenericAuth } from '@envelop/generic-auth'

import { schema } from './schema/index'
import { validateUser, resolveUserFn, setAccessToken } from './lib/auth'
import { formatError } from './lib/errors'

/**
 * getEnveloped uses Envelop to initialize plugins.
 *
 * Envelop providers a low-level hook-based plugin API for developers.
 * By combining plugins, we can compose our own GraphQL "framework",
 * and get a modified version of GraphQL with the capabilities we want:
 *
 * - Logging
 * - Setting Context
 * - Auth
 * - Masking Errors
 *
 */
export const getEnveloped = envelop({
  plugins: [
    useSchema(schema),
    useExtendContext(async (contextSoFar) => {
      return setAccessToken(contextSoFar)
    }),
    useGenericAuth({
      resolveUserFn,
      validateUser,
      mode: 'protect-auth-directive',
    }),
    useLogger(),
    useMaskedErrors({ formatError }),
  ],
  enableInternalTracing: true,
})
