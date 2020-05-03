const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Homem-aranha',
    poder: 'Força, agilidade e sentido aranha'
}

describe('Testando MongoDB Strategy', function() {
    this.beforeAll(async () => {
        await context.connect()
    })

    it('Verificar conexão', async () => {
        const result = await context.isConnected()
        assert.deepEqual(result, true)
    })

    it('Deve cadastrar um herói', async() => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
})