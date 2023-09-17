const asyncHandler = require("express-async-handler")
const State=require('../../models/users/stateModels')
const primeraLetraMayuscula = require("../../utils/lowercase")

const addState=asyncHandler(async (req, res)=>{
    const name= req.body.name
    const newState=await State.create({name:primeraLetraMayuscula(name)})
    res.status(200).json(newState)
})

const updateState=asyncHandler(async (req, res)=>{
    const {id, name}= req.body
    const newState=await State.findByIdAndUpdate(id, {name:primeraLetraMayuscula(name)})
    res.status(200).json(newState)
})

const deleteState=asyncHandler(async (req, res)=>{
    const {id}= req.params
    const Delete=await State.findByIdAndDelete(id)
    res.status(200).json(Delete)
})

const search=asyncHandler(async (req, res)=>{
    const {id, name}=req.query
    var state
    if(id){
        state=await State.findByID(id)
    }
    if(name){
        state=await State.find({ name: { $regex: name, $options: 'i' } })
    }

    if(state){
        res.status(200).json(state)
    }else{
        res.status(400).json({message:'El estado no existe'})
    }
})

module.exports={search, deleteState, updateState, addState}
