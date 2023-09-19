const mongoose=require('mongoose')

const movieSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Ingrese el titulo de la pelicula'],
    },
    overview:{
        type:String,
        required:[true, 'Ingrese la descripción de la pelicula']
    },
    genre:{
        type:Array,
        required:[true, 'Ingrese el genero de la pelicula']
    },
    language:{
        type:Array,
        required:[true, 'Ingrese el idioma de la pelicula']
    },
    movieDuration:String,
    releaseDate:Date,
    posterPath:{
        type:String, 
        required:[true, 'Cargue el poster de la pelicula']
    },
    postBackground:{
        type:String, 
        required:[true, 'Cargue el background de la pelicula']
    },
    director:String,
    actors:Array,
    like:{
        type:Number, 
        default:0
    },
    dislike:{
        type:Number, 
        default:0
    },
    originalTitle:String,
    views:{type:Number, default:0},
    labels:String,
    premiere:{type:Boolean, default:false},//Mostrar las peliculas que estan en estreno
})

module.exports=mongoose.model('Movie', movieSchema)