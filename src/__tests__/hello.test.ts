import { hello } from '../schema/resolvers/hello'

test('says hi', () => {
  expect(hello()).toBe('Hello!')
})
