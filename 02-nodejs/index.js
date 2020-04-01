// importamento um módulo interno do nodejs
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // qdo erro    --> reject(erro)
    // qdo success --> resolve
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error('Forçando erro'))
            return resolve({

                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '20201010',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function() {
        return callback(null, {
            rua: 'Casa',
            numero: 100
        })
    }, 2000);
}

// 1o passo: adicionar a palavra async.
// Ela automaticamente retornará uma Promise

main()
async function main() {
    try {
        console.time('medida-promise')

        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            // Já que telefone e endereço não dependem um do outro
            // coloco eles para executar em segundo plano
            // com await Promise.all
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome}
            Endereço: ${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
        `)

        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('Ocorreu um erro', error)
    }
}


// ************************************************************************
// 2a forma de execução - com promises
// ************************************************************************

// // -------------------------------------------------------------
// // Para manipular o sucesso, usamos .then()
// // Para manipular o erro, usamos o .catch()

// const usuarioPromise = obterUsuario()
// usuarioPromise
//     .then(function (resultadoUsuario) {
//         return obterTelefone(resultadoUsuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: resultadoUsuario.nome,
//                         id: resultadoUsuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function (resultadoEndereco) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: resultadoEndereco
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `)
//     })
//     .catch(function (erro) {
//         console.error('Ocorreu um erro', erro)
//     })



// ************************************************************************
// 1a forma de execução - sem promises - apenas chamando de forma encadeada 
// ************************************************************************

// obterUsuario(function resolverUsuario(erro, usuario) {
//     if (erro) {
//         console.error('Erro no usuário', erro)
//         return
//     }
//     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//         if (erro1) {
//             console.error('Erro no telefone', erro1)
//             return
//         }

//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
//             if (erro2) {
//                 console.error('Erro no endereço', erro2)
//                 return
//             }

//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereço: ${endereco.rua}, ${endereco.numero}
//                 Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })
// }) 