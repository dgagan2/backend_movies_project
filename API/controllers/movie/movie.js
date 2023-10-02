const asyncHandler = require("express-async-handler")
const Movie=require('../../models/movies/movieModels')
const uploadFile=require("../../utils/uploadFiles")
const {primeraLetraMayuscula} = require("../../utils/lowercase")


const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const { posterPath, postBackground, ...updatedFields } = req.body;

    try {
        // Obtén la película existente de la base de datos
        const existingMovie = await Movie.findById(id);

        if (!existingMovie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        // Crea un objeto con los campos actualizados
        const updatedMovieFields = {
            title: updatedFields.title ? primeraLetraMayuscula(updatedFields.title) : existingMovie.title,
            overview: updatedFields.overview || existingMovie.overview,
            genre: updatedFields.genre || existingMovie.genre,
            language: updatedFields.language || existingMovie.language,
            movieDuration: updatedFields.movieDuration || existingMovie.movieDuration,
            releaseDate: updatedFields.releaseDate || existingMovie.releaseDate,
            director: updatedFields.director || existingMovie.director,
            actors: updatedFields.actors || existingMovie.actors,
            originalTitle: updatedFields.originalTitle || existingMovie.originalTitle,
            premiere: updatedFields.premiere || existingMovie.premiere,
            posterPath: posterPath && posterPath.length > 0 ? (await uploadFile(posterPath[0], 'poster')).downloadURL : existingMovie.posterPath,
            postBackground: postBackground && postBackground.length > 0 ? (await uploadFile(postBackground[0], 'background')).downloadURL : existingMovie.postBackground,
            videoLink: updatedFields.videoLink || existingMovie.videoLink,
            billboard: updatedFields.billboard || existingMovie.billboard,
        };

        // Actualiza la película en la base de datos
        const updatedMovie = await Movie.findByIdAndUpdate(id, updatedMovieFields, { new: true });

        if (updatedMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(400).json({ message: 'No se pudo actualizar la película' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


const deleteMovie=async (req, res)=>{
    const {id}=req.params
    if(!id){
        return res.status(400).json({message:'Ingrese el ID de la pelicula'})
    }
    try {
        const movie=await Movie.findByIdAndDelete(id)
        res.status(200).json({message:'Pelicula eliminada'})
    } catch (error) {
        res.status(500).json({message:'La pelicula no existe'})
    }
}


module.exports={updateMovie, deleteMovie}
