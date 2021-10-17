import { verifyToken } from '../lib/auth'

test('it throws an error on an invalid JWT', () => {
  expect(() => verifyToken('foo')).toThrowError()
})
