const express=require('express')
const favoriteMovies=express.Router()
const {addMovieToFavorites, getFavoriteMovies, deleteFavoriteMovie}=require('../controllers/movie/favoriteMovies')

favoriteMovies.get('/', getFavoriteMovies)
favoriteMovies.post('/:movieId', addMovieToFavorites)
favoriteMovies.delete('/:movieId', deleteFavoriteMovie)

module.exports=favoriteMovies