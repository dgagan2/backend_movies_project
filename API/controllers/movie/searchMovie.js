const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')


const searchMovie=asyncHandler(async (req, res)=>{
    const{name, genre, language, originalTitle, skip=0, limit=30}=req.body
    let movie
    if(name || originalTitle){
        movie=await Movie.find({
            $or: [
              { name: { $regex: name, $options: 'i' } },
              { originalTitle: { $regex: originalTitle, $options: 'i' } }
            ]
          }).limit(limit).skip(skip).exec()
    }
    if(genre){
        movie=await Movie.find({genre}).limit(limit).skip(skip).exec()
    }
    if(language){
        movie=await Movie.find({genre}).limit(limit).skip(skip).exec()
    }

    if(movie){
        res.status(200).json(movie)
    }else{
        res.status(404)
        throw new Error('Lo siento, no tenemos nada que mostrar') 
    }
    
})

const searchMovieById=asyncHandler(async (req, res)=>{
    const {id}=req.params
    if(id){
       const movie =await Movie.findByID(id)
       res.status(200).json(movie)
    }else{
        throw new Error('ID vacio')
    }
})

const searchMovieByPremiere=asyncHandler(async (req, res)=>{
    const{skip=0, limit=30}=req.body
    const movie=await Movie.find({premiere:true}).limit(limit).skip(skip).exec()
    if(movie){
        res.status(200).json(movie)
    }else{
        res.status(404)
        throw new Error('Lo siento, no tenemos nada que mostrar') 
    }
})

const searchMovieByReleaseDate=asyncHandler(async (req, res)=>{
    const{startDate, endDate, skip=0, limit=30}=req.body
    const movie=await Movie.find({ 
        releaseDate: {
            $gte: startDate,
            $lte: endDate 
        }}).limit(limit).skip(skip).exec()
        
    if(movie){
        res.status(200).json(movie)
    }else{
        res.status(404)
        throw new Error('Lo siento, no tenemos nada que mostrar') 
    }
})

const searchMovieByMostRecent=asyncHandler(async (req, res)=>{
    const{limit=10}=req.body
    const movie=await Movie.find({}).sort({ releaseDate: -1 }).limit(limit)
    if(movie){
        res.status(200).json(movie)
    }else{
        res.status(404)
        throw new Error('Lo siento, no tenemos nada que mostrar') 
    }
})

const searchMovieByLabels=asyncHandler(async (req, res)=>{
    const{labels, skip=0, limit=30}=req.body
    const movie=await Movie.find({labels}).limit(limit).skip(skip)
    if(movie){
        res.status(200).json(movie)
    }else{
        res.status(404)
        throw new Error('Lo siento, no tenemos nada que mostrar') 
    }
})

module.exports={
    searchMovie, 
    searchMovieById, 
    searchMovieByLabels, 
    searchMovieByMostRecent, 
    searchMovieByPremiere, 
    searchMovieByReleaseDate}