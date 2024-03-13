const router = require ('express').Router()
const controllerLogin = require('../../controllers/login/login.controller')

router.post ('/login',controllerLogin.loginUser)

module.exports= router