"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
test('defaults the port', () => {
    expect(config_1.config.port).toBe('3000');
});
test('defaults the GraphQL endpoint', () => {
    expect(config_1.config.graphQLEndpoint).toBe('/graphql');
});
//# sourceMappingURL=config.test.js.map