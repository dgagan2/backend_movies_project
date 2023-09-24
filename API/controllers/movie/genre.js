const asyncHandler = require("express-async-handler")
const Genre=require('../../models/movies/genreModels')
const primeraLetraMayuscula = require("../../utils/lowercase")

const addGenre=async (req, res)=>{
    const {name}=req.body
    if(!name){
        return res.status(400).json({message:'Ingrese un nombre'})
    }

    try {
        const newGenre=await Genre.create({name:primeraLetraMayuscula(name)})
        res.status(201).json(newGenre)
    } catch (error) {
        res.status(500).json({message:'No se pudo crear el genero, ya existe', error})
    }
    
}

// Se consulta generos de peliculas, debe llegar los ID como arreglos
const getGenreByIDs=asyncHandler(async (req, res)=>{
    const {id}=req.body
    if(!id){
        return res.status(400).json({message:'Ingrese al menos un ID'})
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
        return res.status(400).json({message:'Ingrese el genero a buscar'})
    }
    const genre=await Genre.find( { name: { $regex: name, $options: 'i' } })
    if(genre){
        res.status(200).json(genre)
    }else{
        res.status(400).json({message:'Información no encontrada'})
    }
})

const updateGenre=async (req, res)=>{
    const {name, id}=req.body
    if(!name || !id){
        return res.status(400).json({message:'Ingrese el nombre y ID'})
    }
    try {
        const newGenre=await Genre.findById(id, {name})
        res.status(200).json(newGenre)
    } catch (error) {
        res.status(400).json({message: 'No se pudo actualizar', error})
    }

}

const deleteGenre=asyncHandler(async (req, res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({message:'Ingrese el ID del genero a eliminar'})
    }

    try {
        await Genre.findByIdAndDelete(id)
        res.status(200).json({message:'Lenguaje eliminado'})
    } catch (error) {
        res.status(400).json({message:'No se pudo eliminar, lenguaje no existe', error})
    }
    
})

const getAllGenre=asyncHandler(async (req, res)=>{
    const {skip=0, limit=10}=req.query
    const genre=await Genre.find({}).limit(limit).skip(skip).exec()
    res.status(200).json(genre)
})

module.exports={addGenre, getGenreByIDs, getGenreByName, updateGenre, deleteGenre, getAllGenre}