const {
    readFile,
    writeFile
} = require('fs')

const { promisify } = require('util')

// transforma a função que trabalha com callback para promise
// Assim consigo trabalhar usando async/await sem dor de cabeça
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

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

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true)
        return dadosFiltrados
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now();

        // Junto em um novo objeto o atributo id com os dados do objeto heroi
        // não preciso colocar id:id pq o nome do atributo e o valor são iguais
        // os ... significam "todos os atributos do objeto heroi"
        const heroiComId = {
            id,
            ...heroi
        }

        // Do mesmo jeito que consigo juntar dados em um objeto,
        // é possível juntar dados em um array também
        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado;
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if (indice === -1) {
            throw Error('O herói informado não existe')
        }

        dados.splice(indice, 1)
        
        return await this.escreverArquivo(dados)        
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if (indice === -1) {
            throw Error('O herói informado não existe')
        }

        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }

        dados.splice[indice, 1] // remove da lista

        console.log('objetoAtualizar',objetoAtualizar)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])


    }
}

module.exports = new Database()