const service = require('./service')

// Array Map - Retorna um array novo baseado no que o usuário solicitou
Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

async function main() {
    try {
        const results = await service.obterPessoas('a')
        
        // Usando forEach
        // const names = []

        // results.results.forEach(element => {
        //     names.push(element.name)
        // });


        // Usando map 
        // const names = results.results.map(function (pessoa) {
        //     return pessoa.name
        // })

        // Usando map - De forma mais elegante
        // const names = results.results.map(pessoa => pessoa.name)

        // Usando map customizado
        const names = results.results.meuMap((pessoa, indice) => `[${indice}] ${pessoa.name}`)

                
        console.log(`names`, names)
    }catch (error) {
        console.error('Ocorreu um erro', error)
    }
}

main()