const asyncHandler = require("express-async-handler")
const LikeMovie=require('../../models/movies/likesModels')
const Movie=require('../../models/movies/movieModels')

const updateOrAddLike=asyncHandler(async (req, res)=>{
    const{sub}=req.user
    const {id}=req.params
    try {
        const movie=await Movie.findById(id)
        if(movie){
            const ifExist=await search(id, sub)
            var newLike
            if(ifExist==true){
                    newLike=await LikeMovie.findOneAndUpdate({idMovie:id, idUser:sub}, {like:false}, {new:true})
                addLike(id, -1)
            }
            if(ifExist==false){
                newLike=await LikeMovie.findOneAndUpdate({idMovie:id, idUser:sub}, {like:true}, {new:true})
            addLike(id, 1)
            }
            if(ifExist==null){
                newLike=await LikeMovie.create({idMovie: id, idUser: sub, like:true})
                addLike(id, 1)
            }
            res.status(200).json(newLike)
        }
    } catch (error) {
        res.status(500)
        throw new Error('La pelicula no existe', error)
    }
})


const consultLikeMovies=asyncHandler(async (req, res)=>{
    const{sub}=req.user
    const {id}=req.params
    const like = await search(id, sub)
    if(!like){
        res.status(200).json(false)
    }else{
        res.status(200).json(like)
    }
})



const addLike=async (id, value)=>{
    await Movie.findByIdAndUpdate(id,{like:value})
}

const search=async (id, sub)=>{
    if(!id || !sub){
        throw new Error('Id pelicula vacio')
    }

    const searchLike = await LikeMovie.find({
        idMovie: id,
        idUser: sub,
    }, 'like')
    if(searchLike.length>0){
        return searchLike[0].like
    }else{
        return null
    }
    
}

module.exports={updateOrAddLike, consultLikeMovies}