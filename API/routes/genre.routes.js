const express=require('express')
const genreRoutes=express.Router()
const { addGenre, 
    getGenreByIDs,
    getGenreByName, 
    updateGenre, 
    deleteGenre, 
    getAllGenre, 
    genresFromHeaderMenu} = require('../controllers/movie/genre')
const { checkRoles } = require('../middleware/auth.handler')


genreRoutes.get('/', getAllGenre)
genreRoutes.get('/search', getGenreByName)
genreRoutes.get('/headerMenu', genresFromHeaderMenu)
genreRoutes.get('/id', getGenreByIDs)
genreRoutes.post('/', checkRoles('admin'), addGenre)
genreRoutes.patch('/', checkRoles('admin'), updateGenre)
genreRoutes.delete('/:id', checkRoles('admin'), deleteGenre)


module.exports=genreRoutes