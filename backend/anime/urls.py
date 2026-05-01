from django.urls import path

from . import views

urlpatterns = [
    path("anime/search/", views.search_anime, name="search_anime"),
    path("anime/<int:anime_id>/", views.anime_detail, name="anime_detail"),
]