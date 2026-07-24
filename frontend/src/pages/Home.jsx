import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import {useState, useEffect} from "react" //useEffect adds side effects to func or components and defines when they should run
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {

    const [searchQuery, setSearchQuery] = useState(""); //[name, function]; need this so rerendering allows changes to happen w/out losing stuff
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()  
    }, []) // () => {} is effect and [] are dependencies

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} //how you update the state from an input elt
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/> //map iterates through movie list
                ))} 
            </div>
            )}
        </div>
    );

}

export default Home