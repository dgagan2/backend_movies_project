const expressAsyncHandler = require("express-async-handler");
const User=require('../../models/users/usersModels')
const AuditUser= require('../../models/users/auditModels')
const bcrypt=require('bcrypt');
const signToken = require("../../services/jwt/tokenSignin");
const { validarPassword } = require("../../utils/validations/userValidation");
const hashedPassword = require("./hashedPassword");

const login=expressAsyncHandler(async (req, res)=>{
    const {email, password}=req.body
    if(!email || !password){
        res.status(400)
        throw new Error('Ingrese usuario y contraseña')
    }
    const user=await User.findOne({email})
    const comparePasswords=await bcrypt.compare(password, user.password)
    if(user && comparePasswords){
        if(user.state!='active'){
            res.status(403)
            throw new Error('La cuenta esta deshabilitada')
        }
        const auditSession=await AuditUser.create({
            idUser: user.id,
            email: user.email
        })
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.fullName.firstname,
            role: user.role,
            state: user.state,
            idSession: auditSession.id
        }
        const token=signToken(payload)
        res.status(200).json({
            id: user.id,
            name: user.fullName.firstname && user.fullName.lastName,
            age: user.age,
            address: user.address,
            token: token
        })
    }else{
        res.status(200).json({message:'Su Usuario o Contraseña no son válidos.'})
    }
})

const forgotPassword=expressAsyncHandler(async (req, res)=>{
    const {email, password}=req.body
    if(!email || !password){
        res.status(400)
        throw new Error('Ingrese usuario y contraseña')
    }
    if(!validarPassword(password)){
        res.status(400)
        throw new Error("La contraseña debe tener mas de 6 letras incluyendo simbolos, numeros y mayusculas")
    }
    const updatePassword=await User.findOneAndUpdate({email}, {password:hashedPassword(password)})
    if(updatePassword){
        await AuditUser.create({
            idUser: updatePassword.id,
            email: updatePassword.email,
            event:'change of password'
        })
        res.status(200).json({message:'Contraseña actualizada'})
    }else(
        res.status(200).json({message:'Usuario no valido'})
    )
 
})
module.exports={login, forgotPassword}