 // Extrai somente a função obterPessoa
 const {obterPessoas} = require('./service')

 Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let indice = 0; indice <= this.length -1; indice++) [
        valorFinal = callback(valorFinal, this[indice], this)
    ]

    return valorFinal;
 }

 async function main() {
    try {
        const { results } = await obterPessoas('a')

        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos', pesos)

        // const total = pesos.reduce((anterior, proximo) => { 
        //     return anterior + proximo}
        // , 0)

        const minhaLista = [
            ['Douglas', 'Belinato'],
            ['SpringBoot', 'JavaEE', 'JPA']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(',')
 
        console.log('total', total)

    } catch (error) {
        console.error('Ocorreu um erro', error)
    }
 }

 main()