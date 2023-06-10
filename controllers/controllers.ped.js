'use strict';

exports.get = (req, res,next) => {
    res.status(200).send({
        "consulta":"concluida"});
    };

exports.post = (req, res, next) => { 
    res.status(201).send(req.body); 
};

