const { get } = require('axios')
const URL = 'https://swapi.co/api/people'

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await get(url)
    return response.data.results.map(mapearPessoas)
}

module.exports = {
    obterPessoas
}

function mapearPessoas(item) {
    return {
        nome: item.name,
        altura: item.height
    }
}