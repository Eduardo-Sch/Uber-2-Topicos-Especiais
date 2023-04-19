const CorridaController = require('../controllers/CorridaController');
const express = require('express');

const Router = express.Router();

Router.get('/', CorridaController.listar);
Router.get('/:id', CorridaController.buscarPorId);
Router.post('/', CorridaController.salvar);
Router.put('/:id', CorridaController.atualizar);
Router.delete('/:id', CorridaController.excluir);

module.exports = Router;
