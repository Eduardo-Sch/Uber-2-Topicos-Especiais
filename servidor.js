require('./db/mongo');
const express = require('express');
const servidor = express();
servidor.use(express.json());

//Rotas
const ClienteRouter = require('./routes/ClienteRouter');
servidor.use('/clientes', ClienteRouter);

const CorridaRouter = require('./routes/CorridaRouter');
servidor.use('/corridas', CorridaRouter);

const MotoristaRouter = require('./routes/MotoristaRouter');
servidor.use('/motoristas', MotoristaRouter);

const VeiculoRouter = require('./routes/VeiculoRouter');
servidor.use('/veiculos', VeiculoRouter);

servidor.get('/', function(req, res){    
    res.send('Servidor de APIs rodando...');
});

servidor.listen(3000, function(){
    console.log('Servidor rodando em http://localhost:3000');
});