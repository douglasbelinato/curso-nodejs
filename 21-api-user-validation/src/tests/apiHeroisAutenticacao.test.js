const assert = require('assert')
const api = require('../api')
const Jwt = require('jsonwebtoken')
let app = {}
const JWT_SECRET = 'SECRET'

describe('Suíte de testes para a autenticação da API de Heróis', function() {
    this.beforeAll(async() => {
        app = await api
    })

    it('Deve obter um token JWT válido', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'api-user',
                password: 'api-pass'
            }
        })

        const { token }  = JSON.parse(result.payload)
        assert.ok(Jwt.verify(token, JWT_SECRET))
    })
})