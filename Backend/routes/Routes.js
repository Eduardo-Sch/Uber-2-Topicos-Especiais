const express = require("express");
const Router = express.Router();

//Ativa a autenticação e autorização
//const Auth = require('../auth/Auth');
//Router.use(Auth.autorizar);

const ClienteRouter = require("./clienteRouter");
Router.use("/clientes", ClienteRouter);

const corridaRouter = require("./corridaRouter");
Router.use("/corridas", corridaRouter);

const motoristaRouter = require("./motoristaRouter");
Router.use("/motoristas", motoristaRouter);


module.exports = Router;
