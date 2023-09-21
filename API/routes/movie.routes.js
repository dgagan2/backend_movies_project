const express=require('express')
const movieRoute=express.Router()

const addMovie = require('../controllers/movie/addMovie')
const upload=require('../config/multer')
const { protect, checkRoles } = require('../middleware/auth.handler')
const { deleteMovie, updateMovie } = require('../controllers/movie/movie')
const {
        searchMovie, 
        searchMovieById, 
        searchMovieByLabels, 
        searchMovieByMostRecent, 
        searchMovieByPremiere, 
        searchMovieByReleaseDate, 
        getAllMovie
    } = require('../controllers/movie/searchMovie')
const genreRoutes = require('./genre.routes')
const languageRoutes = require('./language.routes')
const favoriteMovies = require('./favoriteMovies.routes')
const likeRoute = require('./like.routes')

movieRoute.post('/',
    protect(),
    checkRoles('admin'),
    upload.fields([{ name: 'posterPath', maxCount:1 }, { name: 'postBackground', maxCount:1 }]), 
    addMovie
)

movieRoute.get('/', protect(), getAllMovie)
movieRoute.get('/search', protect(), searchMovie)
movieRoute.get('/date', protect(), searchMovieByReleaseDate)
movieRoute.get('/recent', protect(), searchMovieByMostRecent)
movieRoute.get('/labels', protect(), searchMovieByLabels)
movieRoute.get('/premiere', protect(), searchMovieByPremiere)
movieRoute.get('/search/:id', protect(), searchMovieById)

movieRoute.patch('/', 
    protect(), 
    checkRoles('admin'),
    upload.fields([{ name: 'posterPath', maxCount:1 }, { name: 'postBackground', maxCount:1 }]), 
    updateMovie
)

movieRoute.delete('/:id', protect(), checkRoles('admin'), deleteMovie)



movieRoute.use('/language', protect(), languageRoutes)
movieRoute.use('/genre', protect(), genreRoutes)
movieRoute.use('/like', protect(), likeRoute)
movieRoute.use('/favoriteMovies', protect(), favoriteMovies)


module.exports=movieRoute