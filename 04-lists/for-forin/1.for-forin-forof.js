// Importanto o serviço que eu criei
// Import de módulos que nós criamos ou de arquivos json, usamos o ./
// Import de módulos internos do node, não usamos o ./
const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        const names = []

        // Usando for
        console.time('for')
        for (let i = 0; i <= result.results.length - 1; i++) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('for')

        // Usando forin
        console.time('forin')
        for (let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('forin')

        // Usando forof
        console.time('forof')
        for (pessoa of result.results) {            
            names.push(pessoa.name)
        }
        console.timeEnd('forof')


        console.log(`names`, names)
    } catch (error) {
        console.error(`Erro interno`, error)
    }
}

main()