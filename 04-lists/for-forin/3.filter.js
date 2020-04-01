/**
 * No JS, essa técnica é chamada destructing
 * 
 * const pessoa = {
 *      nome: 'Douglas'
 *      idade: 30,
 *      altura: 1.75
 * }
 * 
 * const {nome, idade} = pessoa
 * console.log(nome, idade)
 * 
 */

 // Extrai somente a função obterPessoa
 const {obterPessoas} = require('./service')

 Array.prototype.meuFilter = function (callback) {
     const lista = []
     for (indice in this) {
        const item = this[indice]
        const result = callback(item, indice, this)
         // 0, null, "", undefined === false
         if (!result) continue;

         lista.push(item)
     }

     return lista;
 }


 async function main() {
    try {
        const { results } = await obterPessoas('a')

        // const familiaLars = results.filter(function (item) {
        //     // não encontrou = -1
        //     // encontrou = posição na lista
        //     return item.name.toLowerCase().indexOf(`lars`) !== -1
        // })

        const familiaLars = results.meuFilter((item, indice, lista) => {
            console.log(`Analisando elemento - Indice: ${indice} - Tamanho da Lista: ${lista.length}`)
            return item.name.toLowerCase().indexOf(`lars`) !== -1
        })

        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)
    } catch (error) {
        console.error('Ocorreu um erro', error)
    }
 }

 main()