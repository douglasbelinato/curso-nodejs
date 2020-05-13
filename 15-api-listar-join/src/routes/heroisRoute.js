const BaseRoute = require('./base/baseRoute')

class HeroisRoute extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    let {skip, limit, nome} = request.query

                    let query = {}
                    if (nome) {
                        query.nome= nome
                    }                    
                    
                    if (skip === undefined) {
                        skip = 0
                    }

                    if (limit === undefined) {
                        limit = 10
                    }
                    
                    if (isNaN(skip)) {
                        throw Error('O parâmetro skip deve ser numérico')
                    }
                    if (isNaN(limit)) {
                        throw Error('O parâmetro limit deve ser numérico')
                    }

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.error('Ocorreu um erro', error)
                    return "Erro interno"
                }                
            }
        }
    }
}

module.exports = HeroisRoute