const mongoose=require('mongoose')

const likeSchema=mongoose.Schema({
    idMovie:{
        type:String,
        required:[true, 'Id movie vacio']
    },
    idUser:{
        type:String,
        required:[true, 'Id usuario vacio']
    },
    like:{type:Boolean, default:false}
})

module.exports=mongoose.model('LikeMovie', likeSchema)