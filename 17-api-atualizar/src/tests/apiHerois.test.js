const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Goku',
    poder: 'Super Sayajin'
}

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

    it('Deve cadastrar um herói - POST /herois', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_CADASTRAR
        })

        const {nome, poder} = JSON.parse(result.payload)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('Deve atualizar parcialmente um herói - PATCH /herois/{id}', async() => {
        const resultCadastrar = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_ATUALIZAR
        })

        const heroiCadastrado = JSON.parse(resultCadastrar.payload)        

        const resultAtualizar = await app.inject({
            method: 'PATCH',
            url: `/herois/${heroiCadastrado._id}`,
            payload: {poder: 'Super Sayajin 2'}
        })

        assert.deepEqual(resultAtualizar.result.nModified, 1)
    })

    it.only('Não deve atualizar parcialmente um herói com id incorreto- PATCH /herois/{id}', async() => {
        const resultCadastrar = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_ATUALIZAR
        })

        const heroiCadastrado = JSON.parse(resultCadastrar.payload)        

        const resultAtualizar = await app.inject({
            method: 'PATCH',
            url: '/herois/1}',
            payload: {poder: 'Super Sayajin 2'}
        })

        assert.deepEqual(resultAtualizar.result, 'Erro interno')
    })
})