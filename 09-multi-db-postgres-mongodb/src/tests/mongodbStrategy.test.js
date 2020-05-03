const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

describe('Testando MongoDB Strategy', function() {
    this.beforeAll(async () => {
        await context.connect()
    })

    it('Verificar conexão', async () => {
        const result = await context.isConnected()
        assert.deepEqual(result, true)
    })
})