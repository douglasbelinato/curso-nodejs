// npm i @hapi/hapi @hapi/vision @hapi/inert @hapi/joi -save
// npm i hapi-swagger -save

// Exemplos - Hapi JS com Swagger: 
// https://medium.com/@saivarunk/creating-api-routes-with-swagger-documentation-for-hapi-js-36c663df936d
// https://github.com/glennjones/hapi-swagger

const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroisRoute = require('./routes/heroisRoute')
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: '0.0.1'
    }
};

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

    // Registra no server os módulos
    await app.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }]);

    app.route(
        mapRoutes(new HeroisRoute(context), HeroisRoute.methods())
        )

    await app.start()
    console.log('Servidor executando na porta', app.info.port)

    return app
}

module.exports = main()