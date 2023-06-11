const MotoristaController = require('../controllers/MotoristaController');
const express = require('express');

const Router = express.Router();

Router.get('/', MotoristaController.listar);
Router.get('/:id', MotoristaController.buscarPorId);
Router.post('/', MotoristaController.salvar);
Router.put('/:id', MotoristaController.atualizar);
Router.delete('/:id', MotoristaController.excluir);

module.exports = Router;
