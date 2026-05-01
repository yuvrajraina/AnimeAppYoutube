import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getAnimeDetail } from "../api/animeApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function DetailPage(){
    const {animeId} = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchDetail() {
            setLoading(true);
            setError("");

            try {
                const data = await getAnimeDetail(animeId);
                setAnime(data.anime);
            } catch(err) {
                const message = err.response?.data?.error || "Could not load anime details";
                setError(message);
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();
    }, [animeId]);

    if (loading || !anime) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message="No anime data found" />;
    }

    const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
    const title = anime.title_english || anime.title;
    const genre = anime.genres?.map((genre) => genre.name).join(", ") || "Unknown";
    
    return (
        <main className="detail-page">
            <Link className="back-link" to="/">Back To Search</Link>

            <section className="details-card">
                <img className="details-image" src={imageUrl} alt={title} />
                <div className="details-content">
                    <h1>{title}</h1>
                    <p><strong>Japanese Title</strong> {anime.title_japanese || "N/A"}</p>
                    <p><strong>Score:</strong> {anime.score || "N/A"}</p>
                    <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
                    <p><strong>Type:</strong> {anime.type || "N/A"}</p>
                    <p><strong>genres:</strong> {genre}</p>
                    <p className="synopses">{anime.synopsis || "N/A"}</p>
                </div>
            </section>
        </main>
    );
}

export default DetailPage;