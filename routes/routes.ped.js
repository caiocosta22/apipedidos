'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.ped.js')

router.post('/sincronizar', controllers.sincronizar);

module.exports = router;

