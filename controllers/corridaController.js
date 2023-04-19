const CorridaModel = require('../models/CorridaModel');
const ClienteModel = require('../models/ClienteModel');
const MotoristaModel = require('../models/MotoristaModel');

class CorridaController {

  async listar(req, res){ 
    const resultado = await CorridaModel.find({})
      .populate('motorista')
      .populate('cliente');
    res.json(resultado);
  }

  async buscarPorId(req, res){
    const id = req.params.id;
    const corrida = await CorridaModel.findOne({'_id': id});
    res.json(corrida);
  }

  async salvar(req, res) {            
    const corrida = req.body;
    const idDoMotorista = corrida.motorista;
    const idsDoCliente = corrida.cliente;

    //Vincula a motorista ao corrida
    if (idDoMotorista != null && idDoMotorista != 'undefined' && idDoMotorista != ''){
      corrida.motorista = await MotoristaModel.findOne({'_id': idDoMotorista});
    }

    //Vincula os cliente de ensino ao corrida
    if (idsDoCliente != null && idsDoCliente != 'undefined' 
        && idsDoCliente != '' && idsDoCliente.length > 0){
      corrida.cliente = await ClienteModel.find({'_id': {$in: idsDoCliente}});
    }

    const resultado = await CorridaModel.create(corrida);
    res.json(resultado);
  }

  async atualizar(req, res){
    const id = req.params.id;
    const corrida = req.body;
    const idDoMotorista = corrida.motorista;

    //Atualiza a motorista no corrida
    if (idDoMotorista != null && idDoMotorista != 'undefined' && idDoMotorista != ''){
        corrida.motorista = await MotoristaModel.findOne({'_id': idDoMotorista})
    }

    const resultado = await CorridaModel.findOneAndUpdate({'_id': id}, corrida, {new: true});
    res.json(resultado);
    
  }

  async atualizarCliente(req, res){
    const idDoCorrida = req.params.id;
    const idsDoCliente = req.body;
    
    if(idsDoCliente != null && idsDoCliente != 'undefined' && idsDoCliente.length > 0){
      const clienteAtualizar = await ClienteModel.find({'_id': {$in: idsDoCliente}});
      await CorridaModel.findOneAndUpdate({'_id': idDoCorrida}, {$set: {cliente: clienteAtualizar}});
    } else {
      await CorridaModel.findOneAndUpdate({'_id': idDoCorrida}, {$set: {cliente: []}});
    }

    const resultado = await CorridaModel.findOne({'_id': idDoCorrida});
    res.json(resultado);
  }

  async excluir(req, res){
    const id = req.params.id;
    await CorridaModel.findOneAndDelete({'_id': id});
    res.send("Corrida excluído!");
  }
}

module.exports = new CorridaController();