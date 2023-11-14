const express=require('express')
const languageRoutes=express.Router()
const { addLanguage,
    getLanguageByIDs, 
    getLanguageByName, 
    updateLanguage, 
    deleteLanguage, 
    getAllLanguages } = require('../controllers/movie/language')
const { checkRoles } = require('../middleware/auth.handler')


languageRoutes.get('/', getAllLanguages)
languageRoutes.get('/search', getLanguageByName)
languageRoutes.get('/id', getLanguageByIDs)
languageRoutes.post('/', checkRoles('admin'), addLanguage)
languageRoutes.patch('/', checkRoles('admin'), updateLanguage)
languageRoutes.delete('/:id', checkRoles('admin'), deleteLanguage)

module.exports=languageRoutes