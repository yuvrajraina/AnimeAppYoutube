import axios from "axios"

const API_BASE_URL = "http://127.0.0.1:8000/api"

export async function searchAnime(query, page) { // fsadfsfads/anime/search/?q=dsafaDSFADS&P=2
    const response = await axios.get(`${API_BASE_URL}/anime/search`, {
        params: {
            q: query,
            page: page,
        },
    });
    
    return response.data
}

export async function getAnimeDetail(animeId) {
    const response = await axios.get(`${API_BASE_URL}/anime/${animeId}/`);

    return response.data
    
}
