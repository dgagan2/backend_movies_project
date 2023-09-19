const express=require('express')
const { searchLike, like } = require('../controllers/movie/likeMovie')
const likeRoute=express.Router()

likeRoute.post('search/:id', searchLike)
likeRoute.post('/:id', like)

module.exports=likeRoute