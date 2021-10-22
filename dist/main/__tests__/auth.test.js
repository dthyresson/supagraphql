"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../lib/auth");
test('it throws an error on an invalid JWT', () => {
    expect(() => auth_1.verifyToken('foo')).toThrowError();
});
//# sourceMappingURL=auth.test.js.map