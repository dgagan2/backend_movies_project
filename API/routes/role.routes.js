const express=require('express')
const roleRoute=express.Router()
const {search, deleteRole, updateRole, addRole}=require('../controllers/user/role')

roleRoute.get('/', search )
roleRoute.post('/', addRole)
roleRoute.patch('/', updateRole)
roleRoute.delete('/:id', deleteRole)

module.exports=roleRoute