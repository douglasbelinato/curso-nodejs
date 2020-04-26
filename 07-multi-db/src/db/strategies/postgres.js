const ICrud = require('./interfaces/interfaceCrud')

class PostgresDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log("O item foi salvo no Postgres")
    }
}

module.exports = PostgresDB