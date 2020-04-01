const axios = require('axios')
const URL = 'https://swapi.co/api/people'

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

// Exportando a function como um módulo para poder ser usada
// em outros arquivos js
module.exports = {    
    // chave: nomeDaFuncao
    // Em JS, quando o nome da chave é o mesmo da function,
    // não é preciso repetir obterPessoas: obterPessoas
    // Basta colocar uma única vez.
    obterPessoas
}