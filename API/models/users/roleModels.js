const mongoose=require('mongoose')

const roleSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Ingrese el nombre del role'],
        unique: true
    }
})

module.exports=mongoose.model('Role', roleSchema)