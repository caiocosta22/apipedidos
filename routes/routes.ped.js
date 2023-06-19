'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.ped.js')

router.post('/sincronizar', controllers.sincronizar);

module.exports = router;

// http error 200: concluido com sucesso
// http error 201: criado com sucesso
// http error 400: bad request (requisição com alguma falha)
// http error 401: autenticação inválida
// http error 403: acesso negado
// http error 500: internal server error (qualquer error que der na aplicação, vai ser retornado esse)