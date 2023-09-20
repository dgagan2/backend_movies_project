const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')
const uploadFile=require("../../utils/uploadFiles")
const primeraLetraMayuscula = require("../../utils/lowercase")

const addMovie=asyncHandler(async (req, res)=>{
        const {title, overview, genre, language, movieDuration, 
            releaseDate, director, actors, originalTitle,
            labels, premiere }=req.body
        const {posterPath, postBackground}=req.files
        if(!title || !overview || !genre || !language || !posterPath){
            throw new Error('Campos incompletos, valide la información')
        }
        if(posterPath && posterPath.length>0){
            var {downloadURL}=await uploadFile(posterPath[0], 'poster')
        }
        if(postBackground && postBackground.length>0){
            var background=await uploadFile(postBackground[0], 'background')
        }else{
            throw new Error("Debe cargar las imagenes")
        }
        const movie=new Movie({
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

        const savedMovie=await movie.save()
        res.status(204).json(savedMovie)
    
    }
)

module.exports=addMovie