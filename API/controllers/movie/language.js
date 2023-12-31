const asyncHandler = require("express-async-handler")
const Language=require('../../models/movies/languageModels')

const addLanguage=asyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        return res.status(400).json({message:'Ingrese un nombre'})
    }
    const newLanguage=await Language.create({name})
    res.status(201).json(newLanguage)
    
})

const getLanguageByIDs=async (req, res)=>{
    const {id}=req.body
    if(!id){
        return  res.status(400).json({message:'Ingrese al menos un ID'})
    }
    try {
        const language=await Language.find({_id:{$in:id}})
        res.status(200).json(language)
    } catch (error) {
        res.status(400).json({message:'Lenguaje no encontrado', error})
    }
}

const getLanguageByName=asyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        return res.status(400).json({message:'Ingrese el lenguaje a buscar'})
    }
    const language=await Language.find( { name: { $regex: name, $options: 'i' } })
    if(language){
        res.status(200).json(language)
    }else{
        res.status(400).json({message:'Información no encontrada'})
    }
})

const updateLanguage=async (req, res)=>{
    const {name, id}=req.body
    if(!name || !id){
        return res.status(400).json({message:'Ingrese el nombre y ID'})
    }
    try {
        const newLanguage=await Language.findById(id, {name}, {new:true})
        res.status(200).json(newLanguage)
    } catch (error) {
        res.status(400).json({message: 'No se pudo actualizar', error})
    }
}

const deleteLanguage=asyncHandler(async (req, res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({message:'Ingrese el ID del lenguaje a eliminar'})
    }
    const language=await Language.findByIdAndDelete(id)
    if(language){
        res.status(200).json({message:'Lenguaje eliminado'})
    }else{
        res.status(400).json({message:'No se pudo eliminar, el lenguaje no existe'})
    }
})


const getAllLanguages=asyncHandler(async (req, res)=>{
    const {skip=0, limit=10}=req.query
    const language=await Language.find({}).limit(limit).skip(skip).exec()
    res.status(200).json(language)
})

module.exports={addLanguage,getLanguageByIDs, getLanguageByName, updateLanguage, deleteLanguage, getAllLanguages}