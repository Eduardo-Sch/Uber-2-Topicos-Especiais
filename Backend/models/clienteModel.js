const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  _id: Number,
  nome : { 
    type: String, 
  },
  telefone : { 
    type: String, 
  },
  email : { 
    type: String, 
  },
  avaliacao: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
}, { 
  versionKey: false 
});

//Função geradora de id sequencial
ClienteSchema.pre('save', async function(next){
  //Busca o objeto com o maior id no banco e gera novo id
  const Model = mongoose.model('cliente', ClienteSchema);
  const objMaxId = await Model.findOne().sort({'_id': -1});
  this._id = objMaxId == null ? 1 : objMaxId._id + 1;
  next();
});

module.exports = mongoose.model('cliente', ClienteSchema);