const asyncHandler = require("express-async-handler")
const Role=require('../../models/users/roleModels')
const {lettersToLowercase} = require("../../utils/lowercase")

const addRole=asyncHandler(async (req, res)=>{
    try {
        const name= req.body.name
        if(!name){
           return res.status(500).json({message:'Nombre del role vacio'})
        }
        const newRole=await Role.create({name:lettersToLowercase(name)})
            res.status(201).json(newRole)
    } catch (error) {
        res.status(500).json({message:'No se creo el role', error})
    }
  
})

const updateRole=async (req, res)=>{
    const {id, name}= req.body
    if(!id || !name){
        res.status(500).json({message:'Id o nombre vacios'})
    }
    try {
        const newRole=await Role.findByIdAndUpdate(id, {name:lettersToLowercase(name)}, {new:true})
        res.status(200).json(newRole)
    } catch (error) {
        res.status(400).json({message:'No se actualizo el role', error})
    }
 
}

const deleteRole=asyncHandler(async (req, res)=>{
    const {id}= req.params
    if(!id){
        res.status(500).json({message:'Id vacio'})
    }
    try {
        const Delete=await Role.findByIdAndDelete(id)
        if(Delete){
        res.status(200).json(Delete)
        }else{
             res.status(500).json({message:'Role no existe'})}
    } catch (error) {
        res.status(500).json({message:'Role no existe', error})
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
