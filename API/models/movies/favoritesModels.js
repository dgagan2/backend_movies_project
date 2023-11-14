const mongoose=require('mongoose')

const favoriteSchema=mongoose.Schema({
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    }
}, {timestamps:true})

module.exports=mongoose.model('Favorite', favoriteSchema)