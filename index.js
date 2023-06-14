'use strict';
// Importações da biblioteca express e bodyparser
const express = require('express');
const bodyParser = require('body-parser');

//Declarando que meu objeto app vai utilizar a biblioteca express
const app = express();

// Utilização do body parser no objeto para conseguirmos interpretar formato json
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importação e utilização das rotas
const routePed = require('./routes/routes.ped.js');

app.use('/ped', routePed);


module.exports = app;


