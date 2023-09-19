const asyncHandler = require("express-async-handler")
const LikeMovie=require('../../models/movies/likesModels')

const like=asyncHandler(async (req, res)=>{
    const{sub}=req.user
    const {id}=req.params
    if(!id){
        throw new Error('Id pelicula vacio')
    }
    const searchLike = await LikeMovie.find({
        idMovie: id,
        idUser: sub,
    }).select('like')
    let like
    if(searchLike && searchLike==true){
        like=await LikeMovie.findAndUpdate({
            idMovie: id,
            idUser: sub,
        }, {like:false})
    }
    if(searchLike && searchLike==false){
        like=await LikeMovie.findAndUpdate({
            idMovie: id,
            idUser: sub,
        }, {like:true})
    }
    if(!searchLike){
        like=await LikeMovie.create({
            idMovie: id,
            idUser: sub,
            like:true})
    }
    res.status(200).json(like)
})

const searchLike=asyncHandler(async (req, res)=>{
    const{sub}=req.user
    const {id}=req.params
    if(!id){
        throw new Error('Id pelicula vacio')
    }
    const like = await LikeMovie.find({
        idMovie: id,
        idUser: sub,
    }).select('like')
    if(!like){
        res.status(200).json(false)
    }else{
        res.status(200).json(like)
    }
})

module.exports={searchLike, like}