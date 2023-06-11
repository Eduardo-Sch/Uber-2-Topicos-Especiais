const ClienteController = require('../controllers/clienteController');
const express = require('express');

const Router = express.Router();

Router.get('/', ClienteController.listar);
Router.get('/:id', ClienteController.buscarPorId);
Router.post('/', ClienteController.salvar);
Router.put('/:id', ClienteController.atualizar);
Router.delete('/:id', ClienteController.excluir);

module.exports = Router;
