const asyncHandler = require("express-async-handler")
const LikeMovie=require('../../models/movies/likesModels')
const Movie=require('../../models/movies/movieModels')

const updateOrAddLike=asyncHandler(async (req, res)=>{
    const{sub}=req.user
    const {id}=req.params
    const ifExist=search(id, sub)
    let newLike
    if(ifExist==true){
        newLike=await LikeMovie.findAndUpdate({
            idMovie: id,
            idUser: sub,
        }, {like:false})
        addLike(id, -1)
    }
    if(ifExist==false){
        newLike=await LikeMovie.findAndUpdate({
            idMovie: id,
            idUser: sub,
        }, {like:true})
        addLike(id, 1)
    }
    if(!ifExist){
        newLike=await LikeMovie.create({
            idMovie: id,
            idUser: sub,
            like:true})
        addLike(id, 1)
    }
    res.status(200).json(newLike)
})


const consultLikeMovies=asyncHandler(async (req, res)=>{
    // const{sub}=req.user
    console.log(req.user)
    const {id}=req.params
    const like = search(id, sub)
    if(!like){
        res.status(200).json(false)
    }else{
        res.status(200).json(like)
    }
})



const addLike=async (id, value)=>{
    await Movie.findByIdAndUpdate(id, { $inc: { like: value } }, { new: true }) 
}

const search=async (id, sub)=>{
    if(!id || !sub){
        throw new Error('Id pelicula vacio')
    }
    const searchLike = await LikeMovie.find({
        idMovie: id,
        idUser: sub,
    }).select('like')

    return searchLike
}

module.exports={updateOrAddLike, consultLikeMovies}