const asyncHandler = require("express-async-handler")
const Genre=require('../../models/movies/genreModels')

const addGenre=asyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        throw new Error('Ingrese un nombre')
    }
    const newGenre=await Genre.create({name})
    if(newGenre){
        res.status(200).json(newGenre)
    }else{
        res.status(400).json({message:'No se pudo crear el genero'})
    }
})

const getGenreByIDs=asyncHandler(async (req, res)=>{
    const {id}=req.body
    if(!id){
        throw new Error('Ingrese al menos un ID')
    }
    const genre=await Genre.find({_id:{$in:id}})
    if(genre){
        res.status(200).json(genre)
    }else{
        res.status(400).json({message:'Información no encontrada'})
    }
})

const getGenreByName=asyncHandler(async (req, res)=>{
    const {name}=req.body
    if(!name){
        throw new Error('Ingrese el genero a buscar')
    }
    const genre=await Genre.find( { name: { $regex: name, $options: 'i' } })
    if(genre){
        res.status(200).json(genre)
    }else{
        res.status(400).json({message:'Información no encontrada'})
    }
})

const updateGenre=asyncHandler(async (req, res)=>{
    const {name, id}=req.body
    if(!name || !id){
        throw new Error('Ingrese el nombre y ID')
    }
    const newGenre=await Genre.findById(id, {name})
    if(newGenre){
        res.status(200).json(newGenre)
    }else{
        res.status(400).json({message: 'No se pudo actualizar'})
    }
})

const deleteGenre=asyncHandler(async (req, res)=>{
    const {id}=req.params
    if(!id){
        throw new Error('Ingrese el ID del genero a eliminar')
    }
    const genre=await Genre.findByIdAndDelete(id)
    if(genre){
        res.status(200).json('Lenguaje eliminado:', genre.name)
    }else{
        res.status(400).json({message:'No se pudo eliminar'})
    }
})

const getAllGenre=asyncHandler(async (req, res)=>{
    const {skip=0, limit=10}=req.query
    const genre=await Genre.find({}).limit(limit).skip(skip).exec()
    res.status(200).json(genre)
})

module.exports={addGenre, getGenreByIDs, getGenreByName, updateGenre, deleteGenre, getAllGenre}