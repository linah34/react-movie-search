import "../css/Watchlist.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
    const {watchlist} = useMovieContext();

    if (watchlist && watchlist.length > 0) {
        return (
            <div className="watchlist">
                <h2>Your Watchlist</h2>
            <div className="movies-grid">
                {watchlist.map((movie) => (
                <MovieCard movie={movie} key={movie.id}/> 
                ))} 
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="watchlist-empty">
                <h2>No Movies Yet</h2>
                <p>Start adding movies to your watchlist and come back to them at a later time!</p>
            </div>
        </>
    );
}

export default Watchlist