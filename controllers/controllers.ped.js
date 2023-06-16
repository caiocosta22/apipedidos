'use strict';

const models = require('../models/models.ped.js')

exports.getsql = (req, res) => {
    // Usando a função checapedido do objeto models, ao executa-la me tras um resultado, se der erro, trará também.
    models.checapedidosql(req, res).then(() => {
        return res.status(200).json({ message: "Consulta realizada com suscesso!"});
        })
        .catch(error => {
            return res.status(400).json({ error: "Erro ao consultar"});
        });
};

exports.getpg = (req, res) => {
    models.checapedidopg(req, res).then(() => {
        return res.status(200).json({ message: "Consulta realizada com suscesso!"});
        })
        .catch(error => {
            return res.status(400).json({ error: "Erro ao consultar"});
        });
};

exports.postsql = (req, res) => { 
    const {cep} = req.body;
    models.inserepedidosql(cep).then(() => {
        return res.status(201).json({ message: "Requisição finalizada com sucesso"});
        })
        .catch(error => {
            return res.status(500).json({ error: "Erro ao inserir"});
        });
    };

exports.teste = (req, res) => {
    models.testefinal(req, res).then(() => {
        return res.status(200).json({ message: "Consulta realizada com suscesso!"});
        })
        .catch(err => {
            return res.status(201).json({ message: "Bancos sincronizados "});
        });
    };


