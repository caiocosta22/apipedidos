'use strict';

const models = require('../models/models.ped.js')

exports.sincronizar = (req, res) => {
    models.pedsinc(req, res).then(() => {
        return res.status(200).json({ message: "Consulta realizada com suscesso!"});
        })
        .catch(err => {
            return res.status(201).json({ message: "Bancos sincronizados "});
        });
    };


