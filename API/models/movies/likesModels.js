const mongoose=require('mongoose')

const likeSchema=mongoose.Schema({
    idMovie:{
        type: String
    },
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    like:{
        type:Boolean, 
        default:false
    }
}, {timestamps:true})

module.exports=mongoose.model('LikeMovie', likeSchema)