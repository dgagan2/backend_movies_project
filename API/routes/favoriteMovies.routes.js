const express=require('express')
const favoriteMovies=express.Router()
const {addMovieToFavorites, getFavoriteMovies, deleteFavoriteMovie}=require('../controllers/movie/favoriteMovies')

favoriteMovies.get('/', getFavoriteMovies)
favoriteMovies.post('/', addMovieToFavorites)
favoriteMovies.delete('/:id', deleteFavoriteMovie)

module.exports=favoriteMovies