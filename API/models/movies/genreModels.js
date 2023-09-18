const mongoose=require('mongoose')

const genreSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Nombre del genero obligatorio'],
        unique:true
    }
})

module.exports=mongoose.model('Genre', genreSchema)