'use strict'

const http = require('http');
const debug = require('debug');
const express = require('express');

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) =>{
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});
app.use('/', route);
console.log("Testando...");

app.listen(port)
console.log("Api rodando na porta " + port);

//Funcao para normalizar a porta
function normalizePort(val) {
    const port = parseInt(val, 10);
        if (isNaN(port)){
            return val
            //O valor fornecido não for numero
        }
        if (port>=0){
            return port;
            //O valor fornecido for válido
        }
    return false
    //O valor fornecido for inválido
}