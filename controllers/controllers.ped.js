'use strict';
const models = require('../models/models.ped.js')

exports.getsql = (req, res) => {
    // Usando a função checapedido do objeto models, ao executa-la me tras um resultado, se der erro, trará também.
    models.checapedidosql(req, res).then(result => {
        return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
};

exports.getpg = (req, res) => {
    models.checapedidopg(req, res).then(result => {
        return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
};
/*
    // Declarando e exportando a função para estabelecer nas rotas.
exports.postsql = (req, res) => { 
    res.status(201).send(req.body); 
};*/

