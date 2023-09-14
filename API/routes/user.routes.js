const express=require('express')
const signIn = require('../controllers/user/signIn')
const userRoute=express.Router()

userRoute.post('/', signIn)

module.exports=userRoute