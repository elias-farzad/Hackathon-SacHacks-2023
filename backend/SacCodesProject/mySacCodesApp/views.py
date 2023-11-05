from django.shortcuts import render, redirect
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib import messages
from .main import get_selected_track_info, get_auth_header, get_token, get_top_artists, search_artist, get_tracks  # Import the function

# (Kevin) Use this to get a JSON response of the tracks_info to link to the frontend
def tracks_info(request):
    token = get_token()  # Get the Spotify API token
    header = get_auth_header(token)
    top_artists = get_top_artists()
    artist_ids = search_artist(header, top_artists)
    tracks_info = get_tracks(artist_ids, header)  # Get tracks_info
    return JsonResponse(tracks_info, safe=False)  # Return a JSON response


comments = []
def home(request):
    return render(request, "mySacCodesApp/index.html")
def home(request):
    token = get_token()  # Get the Spotify API token
    header = get_auth_header(token)
    top_artists = get_top_artists()
    artist_ids = search_artist(header, top_artists)
    tracks_info = get_tracks(artist_ids, header)  # Define tracks_info

    if request.method == 'POST':
        selected_index = int(request.POST.get('selected_index'))
        selected_track = get_selected_track_info(tracks_info, selected_index)
        comment = request.POST.get('comment')

        # Append the comment to the list
        comments.append({'track': selected_track, 'comment': comment})

    return render(request, 'mySacCodesApp/home.html', {'tracks_info': tracks_info, 'comments': comments})

