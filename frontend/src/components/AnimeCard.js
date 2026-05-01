import {Link} from "react-router-dom"

function AnimeCard({anime}){
    const imageUrl = anime.images?.jpg?.image_url;
    const title = anime.title_english || anime.title;
    const score = anime.score || "N/A"
    const episodes = anime.episodes || "N/A"
    const type = anime.type || "N/A"

    return (
        <Link className="anime-card" to={`/anime/${anime.mal_id}`}>
            <img src={imageUrl} alt={title}/>
            <div className="anime-card-content">
                <h3>{title}</h3>
                <p>Score: {score}</p>
                <p>Episodes: {episodes}</p>
                <p>Type: {type}</p>
            </div>
        </Link>
    );
}

export default AnimeCard;