const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Joi = require('@hapi/joi');
const HapiSwagger = require('hapi-swagger');

const server = new Hapi.Server({
    port: 3000
});

const failAction = (request, headers, erro) => {
    throw erro;
}

const options = {
    info: {
        title: 'Test API Documentation',
        version: '0.0.1'
    }
};

async function main() {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: options
        }]);

    server.route(
        {
            path: '/api/add',
            method: 'POST',
            config: {                
                description: 'Get algebraic sum',
                notes: 'Pass two numbers as a & b and returns sum',
                tags: ['api'],
                validate: {
                    failAction,
                    payload: Joi.object({
                        a: Joi.number().required(),
                        b: Joi.number().required()
                    })
                }
            },
            handler: (request) => {
                var sum = parseInt(request.payload.a) + parseInt(request.payload.b)
                return sum
            }
        }
    )

    await server.start()
}

main()