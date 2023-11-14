const express=require('express')
const stateRoute=express.Router()
const {search, deleteState, updateState, addState}=require('../controllers/user/state')

stateRoute.get('/', search)
stateRoute.post('/', addState)
stateRoute.patch('/', updateState)
stateRoute.delete('/:id', deleteState)

module.exports=stateRoute