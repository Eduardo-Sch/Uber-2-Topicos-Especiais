const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorridaSchema = new Schema({
  _id: Number,
  dataCriacao : { 
      type: Date, 
      default: Date.now
  },
  pontoPartida : { 
      type: String, 
      required : [true, "Ponto de partida é obrigatório!"]
  },
  pontoChegada : { 
    type: String, 
    required : [true, "Ponto de Pardita é obrigatório!"]
},
  cliente : { type: Number, ref: 'cliente' },
  motorista : { type: Number, ref: 'motorista' },
  distancia: {
    type: Number,
    min: 1,
    max: 100,
    default: function() {
      return Math.floor(Math.random() * (50 - 1 + 1)) + 10;
    }
  },
  valor : Number

}, { 
  versionKey: false 
});

//Função geradora de id sequencial
CorridaSchema.pre('save', async function(next){
  //Busca o objeto com o maior id no banco e gera novo id
  const Model = mongoose.model('corrida', CorridaSchema);
  const objMaxId = await Model.findOne().sort({'_id': -1});
  this._id = objMaxId == null ? 1 : objMaxId._id + 1;
  const distanciaMetros = this.distancia * 1000;
  const valor = Math.ceil(distanciaMetros / 500) * 2.5;
  this.valor = valor;
  next();
});


module.exports = CorridaSchema;