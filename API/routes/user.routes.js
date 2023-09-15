const express=require('express')
const userRoute=express.Router()
const {getUsers, getUserById, filterUser,updateUser, deleteUser}=require('../controllers/user/user')
const {checkRoles, protect}=require('../middleware/auth.handler')

userRoute.get('/all', protect(), checkRoles('admin'), getUsers)
userRoute.get('/search', protect(), checkRoles('admin'), filterUser)
userRoute.get('/:id', protect(), checkRoles('admin', 'customer'), getUserById)

userRoute.patch('/', protect(), checkRoles('admin', 'customer'), updateUser)
userRoute.delete('/:id', protect(), checkRoles('admin'), deleteUser)


module.exports=userRoute