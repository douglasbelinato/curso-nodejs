const BaseRoute = require('./base/baseRoute')
const Join = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro;
}

class HeroisRoute extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // poderia ser assim tbm >>> failAction: failAction (como tem o mesmo nome dos dois lados, podemos simplificar)
                    failAction,
                    query: {
                        skip: Join.number().integer().default(0),
                        limit: Join.number().integer().default(10),
                        nome: Join.string().min(3).max(100)
                    }
                }
            },            
            handler: (request, headers) => {
                try {
                    let {skip, limit, nome} = request.query

                    let query = {}
                    if (nome) {
                        query = {
                            nome: {
                                $regex: `.*${nome}*.`
                            }
                        }
                    }
                                        
                    if (skip === undefined) {
                        skip = 0
                    }

                    if (limit === undefined) {
                        limit = 10
                    }

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.error('Ocorreu um erro', error)
                    return Boom.internal()
                }                
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        nome: Join.string().required().min(3).max(100),
                        poder: Join.string().required().min(2).max(50),
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {nome, poder} = request.payload
                    return await this.db.create({nome, poder})
                } catch(error) {
                    console.error('Ocorreu um erro', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Join.string().required()
                    },
                    payload: {
                        nome: Join.string().min(3).max(100),
                        poder: Join.string().min(2).max(50),
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params

                    // Técnica para remover atributos não inicializados
                    const dadosString = JSON.stringify(request.payload)
                    const dados = JSON.parse(dadosString)

                    return await this.db.update(id, dados)
                } catch(error) {
                    console.error('Ocorreu um erro', error)
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Join.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params
                    return await this.db.delete(id)
                } catch (error) {
                    console.error('Ocorreu um erro', error)
                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroisRoute