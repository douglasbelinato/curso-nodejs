const BaseRoute = require('./base/baseRoute')
const Joi = require('@hapi/joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')

const failAction = (request, headers, erro) => {
    throw erro;
}

class AuthRoute extends BaseRoute {
    constructor(secret, db) {
        super()
        this.db = db
        this.secret = secret
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                description: 'Realiza login na aplicação',
                notes: 'Login',
                tags: ['api'],
                validate: {
                    // poderia ser assim tbm >>> failAction: failAction (como tem o mesmo nome dos dois lados, podemos simplificar)
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },            
            handler: (request, headers) => {     
                const {username, password} = request.payload

                if (username !== "api-user" || password !== "api-pass") {
                    return Boom.unauthorized()
                }

                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)

                return {token}
            }
        }
    }
}

module.exports = AuthRoute