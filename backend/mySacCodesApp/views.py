from django.shortcuts import render, redirect
from django.http import HttpResponse
import json
import logging
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib import messages
from .main import get_selected_track_info, get_auth_header, get_token, get_top_artists, search_artist, get_tracks  # Import the function

# logging object to log messages to the console
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use this to get a JSON response of the tracks_info to link to the frontend
def tracks_info(request):
    try:
        token = get_token()  # get the Spotify API token
        logger.info(f"Token retrieved: {token}")
        header = get_auth_header(token)  # creating the authentication header that will be used in HTTP requests
        logger.info(f"Header: {header}")
        top_artists = get_top_artists()
        logger.info(f"Top artists: {top_artists}")
        artist_ids = search_artist(header, top_artists)
        logger.info(f"Artist IDs: {artist_ids}")
        tracks_info = get_tracks(artist_ids, header)  # Get tracks_info
        logger.info(f"Tracks info retrieved: {tracks_info}")
        return JsonResponse(tracks_info, safe=False)  # Return a JSON response
    except Exception as e:
        logger.error(f"Error retrieving tracks info: {e}")
        return JsonResponse({'error': str(e)}, status=500)

comments = []


def home(request):
    try:
        token = get_token()  # Get the Spotify API token
        if not token:
            raise ValueError("Failed to retrieve token")
        
        header = get_auth_header(token)
        if not header:
            raise ValueError("Failed to retrieve authentication header")
        
        top_artists = get_top_artists()
        if not top_artists:
            raise ValueError("Failed to retrieve top artists")
        
        artist_ids = search_artist(header, top_artists)
        if not artist_ids:
            raise ValueError("Failed to retrieve artist IDs")
        
        tracks_info = get_tracks(artist_ids, header)
        if not tracks_info:
            raise ValueError("Failed to retrieve tracks info")

    except Exception as e:
        logger.error(f"Error in home view: {e}")
        messages.error(request, f"An error occurred: {e}")
        # You could redirect to an error page or return an empty context
        return render(request, 'mySacCodesApp/error.html', {'error': str(e)})

    comments_list = comments.copy()  # Work with a copy of the global comments

    if request.method == 'POST':
        try:
            selected_index = int(request.POST.get('selected_index'))
            selected_track = get_selected_track_info(tracks_info, selected_index)
            comment = request.POST.get('comment')

            # Append the comment to the list
            comments.append({'track': selected_track, 'comment': comment})
        except Exception as e:
            logger.error(f"Error processing form data: {e}")
            messages.error(request, f"An error occurred when processing your comment: {e}")

    return render(request, 'mySacCodesApp/home.html', {'tracks_info': tracks_info, 'comments': comments_list})

# (Alexei)
#functions to send user to signup and signin page, and to sign out
# def signup(request):

#     if request.method == "POST":
#         username = request.POST['username']#'username' is the input tag in the index.html file
#         #OR
#         #username = request.POST.get('username')
#         fname = request.POST['fname']
#         lname = request.POST['lname']
#         email = request.POST['email']
#         pass1 = request.POST['pass1']#pass1 should be the variable you use in the backend
#         pass2 = request.POST['pass2']

#         #insert all these fields as a user in our backend
#         myuser = User.objects.create_user(username, email, pass1)
#         myuser.first_name = fname
#         myuser.last_name = lname

#         myuser.save()

#         messages.success(request, "Your account has been succesfully created.")

#         return redirect('/signin')


#     return render(request, "mySacCodesApp/signup.html")#signup.html changes to whatever the html file for sign up is called

# def signin(request):
#     if request.method == "POST":
#         username = request.POST['username']
#         pass1 = request.POST['pass1']

#         user = authenticate(username = username, password = pass1)

#         if user is not None: #if the right credentials were given
#             login(request, user)
#             fname = user.first_name # type: ignore
#             return redirect("mySacCodesApp/index.html", {'fname': fname})

#         else:
#             messages.error(request, "Incorrect email and/or password.")
#             return redirect('/home')

#     return render(request, "mySacCodesApp/signin.html")

# def signout(request):
#     logout(request)
#     messages.success(request, "Logged out succesfully")
#     return redirect('home')
