const express=require('express')
const signIn = require('../controllers/user/signIn')
const {login, forgotPassword} = require('../controllers/user/login')
const accountRoute=express.Router()

accountRoute.post('/register', signIn)
accountRoute.post('/login', login)
accountRoute.post('/reset/password', forgotPassword)


module.exports=accountRoute