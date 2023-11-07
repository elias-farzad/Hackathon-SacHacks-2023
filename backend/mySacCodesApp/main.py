# Import the necessary modules
from dotenv import load_dotenv
import os
import base64
import requests
import json
import django

# Your Spotify API credentials
client_id = "bd12efc966b2407082c1bf8e0e3efb1a"
client_secret = "4f6cde3de683439b91def8bb3aaa982e"

# Function to get an access token
def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {"grant_type": "client_credentials"}
    result = requests.post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token

# Function to get the authorization header for future requests
def get_auth_header(token):
    return {"Authorization": "Bearer " + token}


# Query the top artists and retrieve their IDs
def search_artist(header, artist_names):
    artist_ids = []
    url = "https://api.spotify.com/v1/search"
    
    # Search artist from chosen and retrieve ID
    for artist_name in artist_names:
        query = f"q={artist_name}&type=artist&limit=1"
        query_url = url + "?" + query
    
        result = requests.get(query_url, headers=header)
        json_result = json.loads(result.content)["artists"]["items"]
        artist_ids.append(json_result[0]["id"])
    
    return artist_ids


# Function to get the top artists from Billboard API
def get_top_artists():
    url = "https://billboard-api2.p.rapidapi.com/artist-100"

    querystring = {"date": "2019-05-11", "range": "1-10"}

    headers = {
        "X-RapidAPI-Key": "2a740ba956mshad4886e47f9f403p1aaaafjsn0e3f47329abb",
        "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    json_result = json.loads(response.content)

    top_artists = [json_result["content"][str(rank)]["artist"] for rank in range(1, 11)]

    # Print the list of top artists
    return top_artists


def get_tracks(artist_ids, header):
    tracks_info = []

    for artist_id in artist_ids:
        url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US"
        result = requests.get(url, headers=header)
        json_result = json.loads(result.content)["tracks"]

        # Max tracks added PER artist is 5
        count_added_track = 0

        for track in json_result:
            # If it's the 5th track, stop
            if count_added_track >= 5:
                break

            track_uri = track["uri"]
            image_url = track["album"]["images"][0]["url"]
            track_name = track["name"]

            track_info = {
                "track_uri": track_uri,
                "track_name": track_name
            }

            tracks_info.append(track_info)
            count_added_track += 1

    # Grab the recommendation tracks based on artist and tracks; style-based recommendations
    return tracks_info
    

def get_selected_track_info(tracks_info, selected_index):
    # Return information about the selected track based on the index
    return tracks_info[selected_index - 1]