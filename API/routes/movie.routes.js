const express=require('express')
const addMovie = require('../controllers/movie/addMovie')
const movieRoute=express.Router()
const upload=require('../config/multer')
const { protect, checkRoles } = require('../middleware/auth.handler')

movieRoute.post('/',
    protect(),
    checkRoles('admin'),
    upload.fields([{ name: 'posterPath', maxCount:1 }, { name: 'postBackground', maxCount:1 }]), 
    addMovie
)

module.exports=movieRoute