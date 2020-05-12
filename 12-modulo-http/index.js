// npm init -y
const http = require('http')

http.createServer((request, response) => {
        response.end('Hello Node!')
    })
    .listen(5000, () => console.log('Servidor em execução - Node JS Http'))