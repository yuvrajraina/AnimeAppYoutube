import requests

from django.http import JsonResponse

JIKAN_URL = "https://api.jikan.moe/v4"


""""
create a function to search anime names
input -> request
output -> JSON for particular anime Limit 10
"""
def search_anime(request):
    query = request.GET.get("q", "").strip() #?q = nartuto
    page = request.GET.get("page", "1") #10 per page page 11 to 20 page 2

    if not query:
        return JsonResponse({ "error" : "enter anime name please"}, status=400)
    
    try:
        response = requests.get(
            f"{JIKAN_URL}/anime",
            params = {
                "q": query,
                "page": page,
                "limit": 10,
                "sfw": "true",
            },
            timeout = 10
        )

        if response.status_code == 429:
            return JsonResponse({ "error" : "too many requests, wait for some time"})
        
        response.raise_for_status()
        data = response.json()

        return JsonResponse(
            {
                "results": data.get("data", []),
                "pagination": data.get("pagination", []),
            }
        )
    except requests.exceptions.RequestException:
        return JsonResponse({"error": "could not fetch"}, status= 500)
    

"""
function toget anime detail user clicked on
input: anime id 
output: description of ainime and other details
"""
def anime_detail(request, anime_id):
    try:
        response = requests.get(
            f"{JIKAN_URL}/anime/{anime_id}/full",
            timeout = 10,
        )

        if response.status_code == 429:
            return JsonResponse({"error": "rate limited try again later"}, status = 400)
        
        if response.status_code == 404:
            return JsonResponse({"eroor" : "Anime npot Found"}, status = 404)
        
        response.raise_for_status()

        data = response.json()

        return JsonResponse({"anime" : data.get("data", {})})
    except requests.exceptions.RequestException:
        return JsonResponse({"error": "could not fetch the anime details"}, status = 500)