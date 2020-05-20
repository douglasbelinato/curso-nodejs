// npm i @hapi/hapi @hapi/vision @hapi/inert @hapi/joi -save
// npm i hapi-swagger -save
// npm i jsonwebtoken
// npm i hapi-auth-jwt2

// Exemplos - Hapi JS com Swagger: 
// https://medium.com/@saivarunk/creating-api-routes-with-swagger-documentation-for-hapi-js-36c663df936d
// https://github.com/glennjones/hapi-swagger

const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')

const Hapi = require('@hapi/hapi')
const HeroisRoute = require('./routes/heroisRoute')
const AuthRoute = require('./routes/authRoute')

const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const HapiAuthJwt2 = require('hapi-auth-jwt2')
const JWT_SECRET = 'SECRET'

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
        HapiAuthJwt2,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }]);

    // define a estratégia de autenticação das requisições na API
    app.auth.strategy('jwt-auth', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // },
        validate: (dado, request) => {
            return {
                isValid: true
            }
        }
    })
    
    app.auth.default('jwt-auth')

    app.route([
        ...mapRoutes(new AuthRoute(JWT_SECRET, context), AuthRoute.methods()),
        ...mapRoutes(new HeroisRoute(context), HeroisRoute.methods())
    ])
    
    await app.start()
    console.log('Servidor executando na porta', app.info.port)

    return app
}

module.exports = main()