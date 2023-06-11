const ClienteModel = require('../models/ClienteModel');

class ClienteController {

  async listar(req, res){ 
    const resultado = await ClienteModel.find({});
    res.json(resultado);
  }

  async buscarPorId(req, res){
    const id = req.params.id;
    const cliente = await ClienteModel.findOne({'_id': id});
    res.json(cliente);
  }

  async salvar(req, res) {            
    const cliente = req.body;
    const resultado = await ClienteModel.create(cliente);
    res.json(resultado);
  }

  async atualizar(req, res){
    const id = req.params.id;
    const cliente = req.body;        
    const resultado = await ClienteModel.findOneAndUpdate({'_id': id}, cliente, {new: true});
    res.json(resultado);
  }

  async excluir(req, res){
    const id = req.params.id;
    await ClienteModel.findOneAndDelete({'_id': id});
    res.send("Cliente excluído!");
  }
}

module.exports = new ClienteController();