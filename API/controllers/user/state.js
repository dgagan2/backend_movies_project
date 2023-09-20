const asyncHandler = require("express-async-handler")
const State=require('../../models/users/stateModels')
const primeraLetraMayuscula = require("../../utils/lowercase")

const addState=asyncHandler(async (req, res)=>{
    const name= req.body.name
    const newState=await State.create({name:primeraLetraMayuscula(name)})
    if(newState){
        res.status(201).json(newState)
    }else{
        res.status(500).json({message:'No se creo el estado'})
    }
    
})

const updateState=async (req, res)=>{
    const {id, name}= req.body
    try {
        const newState=await State.findByIdAndUpdate(id, {name:primeraLetraMayuscula(name)}, { new: true })
        res.status(200).json(newState)
    } catch (error) {
        res.status(500).json({message:'No se pudo actualizar', error})
    }
}

const deleteState=asyncHandler(async (req, res)=>{
    const {id}= req.params
    const Delete=await State.findByIdAndDelete(id)
    if(Delete){
        res.status(200).json({message:'Estado eliminado'})
    }else{
        res.status(400).json({message:'No se encontro el estado'})
    }
    
})

const search=async (req, res)=>{
    const {id, name}=req.query
    try {
        var state
        if(id){
            console.log(id)
            state=await State.findById(id)
        }
        if(name){
            state=await State.find({ name: { $regex: name, $options: 'i' } })
        }
        if(!id && !name){
            state=await State.find({})
        }
        res.status(200).json(state)
    } catch (error) {
        res.status(400).json({message:'El estado no existe', error})
    }
}

module.exports={search, deleteState, updateState, addState}
