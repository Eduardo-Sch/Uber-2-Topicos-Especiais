const MotoristaModel = require('../models/MotoristaModel');
const VeiculoModel = require('../models/VeiculoModel');

class MotoristaController {

  async listar(req, res){ 
    const resultado = await MotoristaModel.find({})
    .populate('veiculo');
    res.json(resultado);
  }

  async buscarPorId(req, res){
    const id = req.params.id;
    const motorista = await MotoristaModel.findOne({'_id': id});
    res.json(motorista);
  }

  async salvar(req, res) {            
    const motorista = req.body;
    const idDoVeiculo = motorista.veiculo;

     //Vincula a motorista ao corrida
     if (idDoVeiculo != null && idDoVeiculo != 'undefined' && idDoVeiculo != ''){
      motorista.veiculo = await VeiculoModel.findOne({'_id': idDoVeiculo});
    }

    const resultado = await MotoristaModel.create(motorista);
    res.json(resultado);
  }

  async atualizar(req, res){
    const id = req.params.id;
    const motorista = req.body;      
    const resultado = await MotoristaModel.findOneAndUpdate({'_id': id}, motorista, {new: true});
    res.json(resultado);
  }

  async excluir(req, res){
    const id = req.params.id;
    await MotoristaModel.findOneAndDelete({'_id': id});
    res.send("DCN excluída!");
  }
}

module.exports = new MotoristaController();