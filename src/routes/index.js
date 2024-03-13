const router = require('express').Router();

///IMPORTACION DE LAS RUTAS

const user = require('./login/login.routes')


/// CREACION DE LAS API

router.use('/user',user)
module.exports = router;
