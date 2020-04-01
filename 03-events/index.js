const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento =  'usuario.click'
//observer
meuEmissor.on(nomeEvento, function (click) {
    console.log('um usuário clicou', click)
})

// meuEmissor.emit(nomeEvento, 'barra de rolagem')
// meuEmissor.emit(nomeEvento, 'btn OK')

// let count = 0
// setInterval(function() {
//     meuEmissor.emit(nomeEvento, 'btn OK' + (count++))
// }, 1000)

const stdin = process.openStdin();
stdin.addListener('data', function (value) {
    console.log(`você digitou: ${value.toString().trim()}`)
})