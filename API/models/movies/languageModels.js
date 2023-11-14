const mongoose=require('mongoose')

const languageSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Campo incompleto'],
        unique:true
    }
}, {timestamps:true})

module.exports=mongoose.model('Language', languageSchema)