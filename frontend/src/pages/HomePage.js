import { useState } from "react";
import { searchAnime } from "../api/animeApi";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import AnimeCard from "../components/AnimeCard";

function HomePage() {
    const [query, setQuery] = useState("");
    const [lastSearch, setLastSearch] = useState("");
    const [animeList, setAnimeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchAnime(searchText, pageNumber) {
        setLoading("true")
        setError("")

        try {
            const data = await searchAnime(searchText, pageNumber);
            setAnimeList(data.results || []);
            setCurrentPage(data.Pagination?.current_page || pageNumber);
            setHasNextPage(data.Pagination?.has_next_page || false);
            setLastSearch(searchText);
        } catch(err) {
            const message = err.response?.data?.error || "something went wrong";
            setError(message);
            setAnimeList([]);
        } finally {
            setLoading(false);
        }   
    }

    function handleSearch(event){
        event.preventDefault();

        if (!query.trim()) {
            setError("Please Enter Anime Name");
            return;
        }

        fetchAnime(query.trim(), 1) 
    }

    function handlePageChange(newPage){
        fetchAnime(lastSearch, newPage)
    }

    return (
        <main className="page">
            <section className="hero">
                <h1>anime search app</h1>
                <p>search anime, view cards, open details etc. etc.</p>
                <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
            </section>

            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}

            {!loading && !error && animeList.length > 0 && (
                <>
                    <section className="anime-grid">
                        {animeList.map((anime) =>(
                            <AnimeCard key ={anime.mal_id} anime={anime}/>
                        ))}
                    </section>
                </>
            )}
        </main>
    );
}

export default HomePage;