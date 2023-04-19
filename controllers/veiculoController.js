const VeiculoModel = require('../models/VeiculoModel');

class VeiculoController {

  async listar(req, res){ 
    const resultado = await VeiculoModel.find({});
    res.json(resultado);
  }

  async buscarPorId(req, res){
    const id = req.params.id;
    const veiculo = await VeiculoModel.findOne({'_id': id});
    res.json(veiculo);
  }

  async salvar(req, res) {            
    const veiculo = req.body;
    const resultado = await VeiculoModel.create(veiculo);
    res.json(resultado);
  }

  async atualizar(req, res){
    const id = req.params.id;
    const veiculo = req.body;      
    const resultado = await VeiculoModel.findOneAndUpdate({'_id': id}, veiculo, {new: true});
    res.json(resultado);
  }

  async excluir(req, res){
    const id = req.params.id;
    await VeiculoModel.findOneAndDelete({'_id': id});
    res.send("DCN excluída!");
  }
}

module.exports = new VeiculoController();