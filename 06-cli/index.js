const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        // Opções para obter dados de cadastro do herói
        .option('-n, --nome [value]', 'Nome do herói')
        .option('-p, --poder [value]', 'Poder do herói')
        .option('-i, --id [value]', 'Id do herói')

        // Opções para obter indicar qual é a operação CRUD a ser realizada
        .option('-c, --cadastrar', 'Cadastra um herói')
        .option('-l, --listar', 'Lista todos os heróis cadastrados')
        .option('-a, --atualizar [value]', 'Atualiza um herói')
        .option('-r, --remover', 'Remove um herói')

        .parse(process.argv)

    try{
        const heroi = new Heroi(Commander)

        if (Commander.cadastrar) {
            // remove o atributo id do objeto heroi.
            // como o atributo id fica como undefinied, ao salvar o registro, esse atributo não será criado / escrito.
            // Com essa estratégia, tiramos o id e deixamos que o próprio método cadastrar do nosso serviço
            // se encarregue de criar o id para nós.
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)

            if (!resultado) {
                console.error('Ocorreu um erro e o herói não foi cadastrado')
                return;
            }

            console.log('Herói cadastrado com sucesso')
        }

        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            
            // remove tds as chaves que estão como undefinied ou null
            const dado = JSON.stringify(heroi)
            const heroiParaAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiParaAtualizar)

            if (!resultado) {
                console.error('Ocorreu um erro e o herói não foi atualizado')
                return;
            }

            console.log('Herói atualizado com sucesso')
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            
            if (!resultado) {
                console.error('Ocorreu um erro e o herói não foi removido')
                return;
            }

            console.log('Herói removido com sucesso')
        }
    } catch(error) {
        console.log('Ocorreu um erro', error)
    }
}

main()