const ICrud = require('./interfaces/interfaceCrud')
// npm install mongoose
const Mongoose = require('mongoose')

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const STATUS = {
            0: 'Desconectado',
            1: 'Conectado',
            2: 'Conectando',
            3: 'Desconectando'
        }

        const state = STATUS[this._driver.readyState]
        
        if (state === 'Conectado') return true;

        if (state !== 'Conectando') return false;

        // Se ainda estiver conectando, aguarda mais 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tenta verificar novamente se conectou
        return STATUS[this._driver.readyState] === 'Conectado';
    }

    async connect() {        
        Mongoose.connect('mongodb://heroiapp:pass@localhost:27017/herois',
            { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
                if (!error) return;
                console.error('Falha na conexão com o MongoDB!', error)
            })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('MongoDB em execução e conexão realizada com sucesso!'))

        this._driver = connection
        await this.defineModel()
    }

    async defineModel() {
        // Modelo da coleção
        const heroisSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertAt: {
                type: Date,
                default: new Date()
            }
        })

        // seta a definição do modelo
        this._herois = Mongoose.model('herois', heroisSchema)
    }

    async create(item) {
        return await this._herois.create(item)
    }
}

module.exports = MongoDB