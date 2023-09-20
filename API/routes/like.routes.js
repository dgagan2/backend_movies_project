const express=require('express')
const { updateOrAddLike, consultLikeMovies } = require('../controllers/movie/likeMovie')
const likeRoute=express.Router()

likeRoute.get('/:id', consultLikeMovies)
likeRoute.post('/:id', updateOrAddLike)

module.exports=likeRoute