// npm i hapi
const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroisRoute = require('./routes/heroisRoute')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    // No Node, essas chamadas são equivalentes:
    // new HeroisRoute().list()
    // new HeroisRoute()['list']
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))

    app.route(
        mapRoutes(new HeroisRoute(context), HeroisRoute.methods())
        )

    await app.start()
    console.log('Servidor executando na porta', app.info.port)

    return app
}

module.exports = main()