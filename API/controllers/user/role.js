const asyncHandler = require("express-async-handler")
const Role=require('../../models/users/roleModels')
const primeraLetraMayuscula = require("../../utils/lowercase")

const addRole=asyncHandler(async (req, res)=>{
    const name= req.body.name
    const newRole=await Role.create({name:primeraLetraMayuscula(name)})
    if(newRole){
        res.status(201).json(newRole)
    }else{
        res.status(500).json({message:'No se creo el role'})
    }
    
})

const updateRole=async (req, res)=>{
    const {id, name}= req.body
    try {
        const newRole=await Role.findByIdAndUpdate(id, {name:primeraLetraMayuscula(name)}, {new:true})
        res.status(200).json(newRole)
    } catch (error) {
        res.status(400).json({message:'No se actualizo el role', error})
    }
 
}

const deleteRole=asyncHandler(async (req, res)=>{
    const {id}= req.params
    const Delete=await Role.findByIdAndDelete(id)
    if(Delete){
        res.status(200).json(Delete)
    }else{
        res.status(500).json({message:'Role no existe'})
    }
    
})

const search=async (req, res)=>{
    const {id, name}=req.query
    try {
        var role
        if(id){
            role=await Role.findById(id)
        }
        if(name){
            role=await Role.find({ name: { $regex: name, $options: 'i' } })
        }
        if(!id && !name){
            role = await Role.find({})
        }
        res.status(200).json(role)
    } catch (error) {
        res.status(400).json({message:'El role no existe', error})
    }
}

module.exports={search, deleteRole, updateRole, addRole}
