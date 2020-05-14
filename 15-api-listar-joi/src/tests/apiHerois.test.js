const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Suíte de testes para a API de Heróis', function() {
    this.beforeAll(async() => {
        app = await api
    })

    it('Deve listar heróis - GET /herois', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        assert.ok(Array.isArray(dados))
    })

    it('Deve paginar 1 herói - GET /herois?skip=0&limit=1', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=1'
        })

        const dados = JSON.parse(result.payload)
        assert.deepEqual(dados.length, 1)
    })

    it('Deve gerar erro com parâmetro limit inválido - GET /herois?skip=0&limit=teste', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?limit=teste'
        })

        assert.deepEqual(result.statusCode, 400)
    })

    it('Deve gerar erro com parâmetro skip inválido - GET /herois?skip=0&skip=teste', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=teste'
        })

        assert.deepEqual(result.statusCode, 400)
    })

    it('Deve gerar erro com parâmetro nome inválido - GET /herois?nome=H', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?nome=H'
        })

        assert.deepEqual(result.statusCode, 400)
    })

    it('Deve buscar herói pelo nome completo - GET /herois?nome=Homem-aranha', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?nome=Homem-aranha'
        })        
        
        assert.ok(JSON.parse(result.payload).length >= 1)
    })
})