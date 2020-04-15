const { deepEqual, ok } = require('assert')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Anel de energia',
    id: 2
}

const database = require('./database')

describe('Suite de manipulação de Heróis', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    
    it('deve ler um herói, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        // os colchetes [] são um recurso do JS chamado destructor
        // eles correspondem à:
        //      const primeiraPosicao = resultado[0]
        // Se eu quisesse algo como:
        //      const primeiraPosicao = resultado[0]
        //      const segundaPosicao = resultado[1]
        //      const terceiraPosicao = resultado[2]
        // Eu poderia usar dessa forma:
        //      const [resultado, posicao1, posicao2] = await database.listar(expected.id)
        // Sendo que se posicao1 e posicao2 não tiverem valor, eles vem como nulo
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)

    })

    it('deve cadastrar um herói, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)        
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(atual, expected)

    })

    it('deve remover um herói por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)        
    })

    it.only('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})