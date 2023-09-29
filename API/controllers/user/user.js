const asyncHandler = require("express-async-handler")
const User=require('../../models/users/usersModels')
const { deletePassword, removePasswords } = require("../../utils/deletePassword")


const getUsers=asyncHandler(async (req, res)=>{
    const {limit=20, skip=0}=req.query
    const users=await User.find({}).limit(limit).skip(skip)
    res.status(200).json(removePasswords(users))
})

const getUserById=asyncHandler(async (req, res)=>{
    const {id}=req.params
    const user=await User.findById(id)
    res.status(200).json(deletePassword(user))
})

const filterUser=asyncHandler(async (req, res)=>{
    const {email, role, state}=req.query
    var user
    if(email){
        user=await User.find({ email: { $regex: email, $options: 'i' } })
    }
    if(role){
        user=await User.find({role})
    }
    if(state){
        user=await User.find({state})
    }
    res.status(200).json(removePasswords(user))
})

const updateUser=asyncHandler(async (req, res)=>{

    const {id, email, role, state, firstname, lastName, age, city, street, phoneNumber}= req.body
    const newUser=await User.findByIdAndUpdate(id, {
        email,
        role,
        state,
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
        res.status(200).json({message:"Datos actualizado"})
    }else{
        res.status(200).json({message:"No se actualizaron los datos"})
    }
    
})

const deleteUser=asyncHandler(async (req, res)=>{
    const {id}=req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({message: "Usuario eliminado"})
})

module.exports={getUsers, getUserById, filterUser, updateUser, deleteUser}
