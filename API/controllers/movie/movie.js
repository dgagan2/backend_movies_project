const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')
const uploadFile=require("../../utils/uploadFiles")
const primeraLetraMayuscula = require("../../utils/lowercase")

const updateMovie=asyncHandler(async (req, res)=>{
        const {id, title, overview, genre, language, movieDuration, 
            releaseDate, director, actors, originalTitle,
            labels, premiere }=req.body
        const {posterPath, postBackground}=req.files
        try {
                if(!id || !title || !overview || !genre || !language|| !releaseDate){
                      return  res.status(500).json({message:'Campos obligatorios vacios'})
                }
            if(posterPath && posterPath.length>0){
                    var {downloadURL}=await uploadFile(posterPath[0], 'poster')
            }else{
                   return res.status(500).json({message:'Imagen de poster vacia'})
            }
            if(postBackground && postBackground.length>0){
                   var background=await uploadFile(postBackground[0], 'background')
            }else{
                   return res.status(500).json({message:'Imagen de fondo vacia'})
            }
                const newMovie=await Movie.findByIdAndUpdate(id, {
                    title: primeraLetraMayuscula(title),
                    overview,
                    genre,
                    language,
                    movieDuration,
                    releaseDate,
                    director,
                    actors,
                    originalTitle,
                    adult,
                    labels,
                    premiere,
                    posterPath:downloadURL,
                    postBackground:background.downloadURL
                })
                res.status(200).json(newMovie)
        } catch (error) {
                  res.status(400).json({message:'No se pudo actualizar la pelicula', error})
        }
}     
)

const deleteMovie=async (req, res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({message:'Ingrese el ID de la pelicula'})
    }
    try {
        const movie=await Movie.findByIdAndDelete(id)
        res.status(200).json({message:'Pelicula eliminada'})
    } catch (error) {
        res.status(500).json({message:'La pelicula no existe'})
    }
}


module.exports={updateMovie, deleteMovie}
