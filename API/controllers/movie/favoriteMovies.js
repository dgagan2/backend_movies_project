const expressAsyncHandler = require('express-async-handler');
const Favorite = require('../../models/movies/favoritesModels')

const addMovieToFavorites = async (req, res) => {
    const { movieId } = req.body
    const {sub} = req.user

    try {
        let favoriteList = await Favorite.findOne({ user: sub });

        if (!favoriteList) {
            favoriteList = new Favorite({
                user: sub,
                movies: []
            });
        }

        if (!favoriteList.movies.includes(movieId)) {
            favoriteList.movies.push(movieId);
            await favoriteList.save();
        }

        res.status(204).json({ message: 'Película agregada a la lista de favoritos' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la película a la lista de favoritos', error });
    }
}

const getFavoriteMovies=expressAsyncHandler(async(req, res)=>{
        const {sub}=req.user
        const listFavorite=await Favorite.findOne({user:sub})
        res.status(200).json(listFavorite)
    }
)

const deleteFavoriteMovie=async(req, res)=>{
    const {sub}=req.user
    const { movieId } = req.params
    try {
        const favorite=await Favorite.findOneAndDelete({user:sub, movies:movieId})
        res.status(200).json({message:'Pelicula quitada de favoritos'})
    } catch (error) {
        res.status(500).json({message:'Error al quitar la pelicula de favoritos'})
    }

}

module.exports = {addMovieToFavorites, getFavoriteMovies, deleteFavoriteMovie}
