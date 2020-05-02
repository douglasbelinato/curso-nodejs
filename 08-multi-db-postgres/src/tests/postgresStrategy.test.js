const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Homem-aranha',
    poder: 'Força, agilidade e sentido aranha'
}

describe('Testando Postgres Strategy', function() {
    // Como pode haver uma certa demora para conectar no banco, definimos
    // que ele pode levar o tempo que for necessário
    this.timeout(Infinity)

    this.beforeAll(async () => {
        await context.connect()
    })
    
    it('Deve validar a conexão com o banco de dados PostgresSQL', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Deve cadastrar um herói', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Deve listar um herói', async () => {
        const [result] = await context.read(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})