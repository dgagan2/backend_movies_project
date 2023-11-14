const expressAsyncHandler = require("express-async-handler");
const User=require('../../models/users/usersModels')
const AuditUser= require('../../models/users/auditModels')
const bcrypt=require('bcrypt');
const {signToken, verifyToken} = require("../../services/jwt/tokenSignin");
const { validarPassword } = require("../../utils/validations/userValidation");
const hashedPassword = require("./hashedPassword");



const login=expressAsyncHandler(async (req, res)=>{
    const {email, password}=req.body
    if(!email || !password){
        return res.status(400).json({message:'Ingrese usuario y contraseña'})
    }
    const user=await User.findOne({email})
    const comparePasswords=await bcrypt.compare(password, user.password)
    if(user && comparePasswords){
        if(user.state!='active'){
            return res.status(403).json({message:'La cuenta esta deshabilitada'})
        }
        const auditSession=await AuditUser.create({
            idUser: user.id,
            email: user.email
        })
        const payload = {
            sub: user.id,
            name: user.fullName.firstname,
            role: user.role,
            state: user.state,
            idSession: auditSession.id
        }
        const token=signToken(payload)

        res.status(200).json({
            id: user.id,
            name: user.fullName.firstname,
            role: user.role,
            token: token
        })
    }else{
        res.status(400).json({message:'Su Usuario o Contraseña no son válidos.'})
    }
})

const refreshJWT=async(req, res)=>{
    const {token}=req.body
    if(!token){
        return res.status(400).json({message:'Token vacio'})
    }
    try {
        
    const verify=await verifyToken(token)

        const payload = {
            sub: verify.sub,
            name: verify.name,
            role: verify.role,
            state: verify.state,
            idSession: verify.idSession
        }
        const newtoken=signToken(payload)
        res.status(200).json({
            id: verify.sub,
            name: verify.name,
            role: verify.role,
            token: newtoken
        })
       
    } catch (error) {
        res.status(400).json({message:'Something goes wrong', error})
    }

}

const forgotPassword=expressAsyncHandler(async (req, res)=>{
    const {email, password}=req.body
    if(!email || !password){
        return res.status(400).json({message:'Ingrese usuario y contraseña'})
    }
    if(!validarPassword(password)){
        return res.status(400).json({message:"La contraseña debe tener mas de 6 letras incluyendo simbolos, numeros y mayusculas"})
    }
    const updatePassword=await User.findOneAndUpdate({email}, {password:await hashedPassword(password)})
    if(updatePassword){
        await AuditUser.create({
            idUser: updatePassword.id,
            email: updatePassword.email,
            event:'change of password'
        })
        res.status(200).json({message:'Contraseña actualizada'})
    }else(
        res.status(400).json({message:'Usuario no valido'})
    )
 
})
module.exports={login, forgotPassword,refreshJWT}
