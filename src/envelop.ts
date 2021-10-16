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
