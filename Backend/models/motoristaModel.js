const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotoristaSchema = new Schema({
  _id: Number,
  nome : { 
    type: String, 
    required : [true, "nome é obrigatório!"]
  },
  telefone : { 
    type: String, 
    required : [true, "telefone é obrigatório!"]
  },
  email : { 
    type: String, 
    required : [true, "email é obrigatório!"]
  },
  avaliacao: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  veiculo : { type: Number, ref: 'veiculo' },
}, { 
  versionKey: false 
});

//Função geradora de id sequencial
MotoristaSchema.pre('save', async function(next){
  //Busca o objeto com o maior id no banco e gera novo id
  const Model = mongoose.model('motorista', MotoristaSchema);
  const objMaxId = await Model.findOne().sort({'_id': -1});
  this._id = objMaxId == null ? 1 : objMaxId._id + 1;
  next();
});

module.exports = mongoose.model('motorista', MotoristaSchema);