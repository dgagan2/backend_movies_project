const mongoose=require('mongoose')

const stateSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Ingrese el nombre del estado'],
        unique: true
    }
}, {timestamps:true})

module.exports=mongoose.model('State', stateSchema)