const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')


const searchMovie=asyncHandler(async (req, res)=>{
    const{title, genre, language, originalTitle, skip=0, limit=20}=req.body
    let movie
    if(title){
        movie=await Movie.find(
            {
                title: { $regex: title, $options: 'i' }
            }
        ).limit(limit).skip(skip) 
    }
    if(originalTitle){
        movie=await Movie.find(
            {
              originalTitle: { $regex: originalTitle, $options: 'i' } 
            }
        ).limit(limit).skip(skip) 
    }
    if(genre){
        movie=await Movie.find(
            {
                genre:{ $regex: genre, $options: 'i' }
            }
        ).limit(limit).skip(skip)
    }   
    if(language){
        movie=await Movie.find(
            {
                language:{ $regex: language, $options: 'i' }
            }
        ).limit(limit).skip(skip)
    }

    if(!movie || Object.keys(movie).length==0){
        res.status(404).json({message:'Lo siento, no tenemos nada que mostrar'})
    }else{
        res.status(200).json(movie)
    }
    
})

const searchMovieById=asyncHandler(async (req, res)=>{
    const {id}=req.params
    if(id){
       const movie =await Movie.findByID(id)
       res.status(200).json(movie)
    }else{
        res.status(400).json({message:'ID vacio'})
    }
})

const searchMovieByPremiere=asyncHandler(async (req, res)=>{
    const{skip=0, limit=8}=req.body
    const movie=await Movie.find({premiere:true}).limit(limit).skip(skip)
    res.status(200).json(movie)
    
})

const searchMovieBillboard=asyncHandler(async (req, res)=>{
    const{skip=0, limit=5}=req.body
    const movie=await Movie.find({billboard:true}).limit(limit).skip(skip)
    res.status(200).json(movie)
    
})
const searchMovieByReleaseDate=asyncHandler(async (req, res)=>{
    const{startDate, endDate, skip=0, limit=30}=req.body
    if(!startDate || !endDate){
        return res.status(404).json({message:'Datos incompletos'})
    }
    const movie=await Movie.find({ 
        releaseDate: {
            $gte: startDate,
            $lte: endDate 
        }}).limit(limit).skip(skip)

    res.status(200).json(movie)
    
})

const searchMovieByMostRecent=asyncHandler(async (req, res)=>{
    const{limit=10}=req.body
    const movie=await Movie.find({}).sort({ releaseDate: -1 }).limit(limit)
    res.status(200).json(movie)

})

const searchMovieByLabels=asyncHandler(async (req, res)=>{
    const{labels, skip=0, limit=20}=req.body
    if(!labels){
        return res.status(400).json({message:'Etiqueta vacia'})
    }
    const movie=await Movie.find({labels}).limit(limit).skip(skip)
    res.status(200).json(movie)
    
})


const getAllMovie=asyncHandler(async (req, res)=>{
    const {skip=0, limit=20}=req.query
    const movie=await Movie.find({}).limit(limit).skip(skip).exec()
    res.status(200).json(movie)
})

module.exports={
    searchMovie, 
    searchMovieById, 
    searchMovieByLabels, 
    searchMovieByMostRecent, 
    searchMovieByPremiere, 
    searchMovieByReleaseDate, 
    getAllMovie,
    searchMovieBillboard}
