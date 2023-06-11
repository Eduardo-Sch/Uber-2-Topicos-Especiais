const VeiculoController = require('../controllers/VeiculoController');
const express = require('express');

const Router = express.Router();

Router.get('/', VeiculoController.listar);
Router.get('/:id', VeiculoController.buscarPorId);
Router.post('/', VeiculoController.salvar);
Router.put('/:id', VeiculoController.atualizar);
Router.delete('/:id', VeiculoController.excluir);

module.exports = Router;
