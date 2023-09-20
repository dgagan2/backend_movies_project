const asyncHandler = require("express-async-handler")
const User=require('../../models/users/usersModels')
const hashedPassword = require("./hashedPassword")
const { validarPassword, validarEmail } = require("../../utils/validations/userValidation")
const {deletePassword} = require("../../utils/deletePassword")

const signIn=asyncHandler(async (req, res)=>{
    const {email, password, firstname, lastName, age, city, street, phoneNumber}= req.body

    if(!email || !password || !firstname || !lastName || !age){
        res.status(400)
        throw new Error('Campos obligatorios vacios')
    }
    if(!validarEmail(email)){
        res.status(400)
        throw new Error("Correo no valido")
    }
    if(await User.findOne({email})){
        res.status(400)
        throw new Error("Usuario ya existe")
    }
    if(!validarPassword(password)){
        res.status(400)
        throw new Error("La contraseña debe tener mas de 6 letras incluyendo simbolos, numeros y mayusculas")
    }
    if(age<18){
        res.status(400)
        throw new Error("Debe ser mayor de edad para poder registrarse")
    }
    const newUser=await User.create({
        email,
        password: await hashedPassword(password),
        fullName:{
            firstname, 
            lastName, 
        },
        age,
        address:{
            city, 
            street, 
        },
        phoneNumber
    })
    if(newUser){
        res.status(201).json(deletePassword(newUser))
    }else{
        res.status(500).json({message:'Usuario no creado'})
    }

})

module.exports=signIn