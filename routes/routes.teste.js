'use strict';
// Rota criada para testes iniciais de desenvolvimento
const express = require('express');
const router = express.Router();

const teste = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node API Pedidos",
        version: "0.0.2"
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

module.exports = teste;

// http error 200: concluido com sucesso
// http error 201: criado com sucesso
// http error 400: bad request (requisição com alguma falha)
// http error 401: autenticação inválida
// http error 403: acesso negado
// http error 500: internal server error (qualquer error que der na aplicação, vai ser retornado esse)