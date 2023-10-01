const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')
const uploadFile=require("../../utils/uploadFiles")
const {primeraLetraMayuscula} = require("../../utils/lowercase")

const addMovie=asyncHandler(async (req, res)=>{
         const {title, overview, genre, language, movieDuration, 
            releaseDate, director, actors, premiere, billboard, videoLink }=req.body
        const {posterPath, postBackground}=req.files
         try {
            if(!title || !overview || !genre || !language ){
            return res.status(400).json({message:'Campos incompletos, valide la información'})
        }
        if(posterPath && posterPath.length>0){
            var {downloadURL}=await uploadFile(posterPath[0], 'poster')
        }else{
              return res.status(400).json({message:'Debe cargar la imagen de poster'})
        }
        if(postBackground && postBackground.length>0){
            var background=await uploadFile(postBackground[0], 'background')
        }else{
            return res.status(400).json({message:'Debe cargar las imagenes'})
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
            premiere,
            posterPath:downloadURL,
            postBackground:background.downloadURL,
            billboard,
            videoLink
        })

        const savedMovie=await movie.save()
        res.status(201).json(savedMovie)
  } catch (error) {
            res.status(500).json({message:'Error al crear la pelicula', error})
  } 
    
    }
)

module.exports=addMovie
