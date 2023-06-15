'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importação e utilização das rotas
const routePed = require('./routes/routes.ped.js');

app.use('/ped', routePed);

module.exports = app;


