import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie}) {
    const {
        isFavorite, 
        addToFavorites, 
        removeFromFavorites,
        isOnWatchlist,
        addToWatchlist,
        removeFromWatchlist
    } = useMovieContext()

    const favorite = isFavorite(movie.id)

    const onWatchlist = isOnWatchlist(movie.id)

    function onFavorite(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    function onWatch(e) {
        e.preventDefault()
        if (onWatchlist) removeFromWatchlist(movie.id)
        else addToWatchlist(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}></img>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavorite}>
                    ❤︎⁠
                </button>
                <button className={`watch-btn ${onWatchlist ? "active" : ""}`} onClick={onWatch}>
                    ✚
                </button>                
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>

}

export default MovieCard