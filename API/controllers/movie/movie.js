const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')
const uploadFile=require("../../utils/uploadFiles")
const primeraLetraMayuscula = require("../../utils/lowercase")

const updateMovie=asyncHandler(async (req, res)=>{
        const {id, title, overview, genre, language, movieDuration, 
            releaseDate, director, actors, originalTitle,
            labels, premiere }=req.body
        const {posterPath, postBackground}=req.files
        if(posterPath && posterPath.length>0){
            var {downloadURL}=await uploadFile(posterPath[0], 'poster')
        }
        if(postBackground && postBackground.length>0){
            var background=await uploadFile(postBackground[0], 'background')
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
        if(newMovie){
            res.status(200).json(newMovie)
        }else{
            res.status(400).json({message:'No se pudo actualizar la pelicular'})
        }
       
    
    }
)

const deleteMovie=asyncHandler(async (req, res)=>{
    const {id}=req.params
    if(!id){
        throw new Error('Ingrese el ID de la pelicula')
    }
    const movie=await Movie.findByIdAndDelete(id)
    res.status(200).json({message:'Pelicula eliminada'})
})


module.exports={updateMovie, deleteMovie}