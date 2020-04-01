const {readFile} = require('fs')

const { promisify } = require('util')

// transforma a função que trabalha com callback para promise
// Assim consigo trabalhar usando async/await sem dor de cabeça
const readFileAsync = promisify(readFile)

// outra forma de obter dados json
// const dadosJson = require('./herois.json')

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        // le o arquivo e retorna buffer string
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    escreverArquivo() {

    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true)
        return dadosFiltrados
    }
}

module.exports = new Database()