const asyncHandler = require("express-async-handler")
const Role=require('../../models/users/roleModels')
const primeraLetraMayuscula = require("../../utils/lowercase")

const addRole=asyncHandler(async (req, res)=>{
    const name= req.body.name
    const newRole=await Role.create({name:primeraLetraMayuscula(name)})
    res.status(200).json(newRole)
})

const updateRole=asyncHandler(async (req, res)=>{
    const {id, name}= req.body
    const newRole=await Role.findByIdAndUpdate(id, {name:primeraLetraMayuscula(name)})
    res.status(200).json(newRole)
})

const deleteRole=asyncHandler(async (req, res)=>{
    const {id}= req.params
    const Delete=await Role.findByIdAndDelete(id)
    res.status(200).json(Delete)
})

const search=asyncHandler(async (req, res)=>{
    const {id, name}=req.query
    var role
    if(id){
        role=await Role.findByID(id)
    }
    if(name){
        role=await Role.find({ name: { $regex: name, $options: 'i' } })
    }

    if(role){
        res.status(200).json(role)
    }else{
        res.status(400).json({message:'El role no existe'})
    }
})

module.exports={search, deleteRole, updateRole, addRole}
