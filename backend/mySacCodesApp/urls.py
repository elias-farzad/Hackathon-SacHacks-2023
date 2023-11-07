# urls.py
from django.urls import include, path
from . import views

urlpatterns = [
    
    path('', views.home, name='home'), # maps root URL (localhost:8000) to home view function in views.py
    path('api/tracks_info', views.tracks_info, name='tracks_info'),  # maps URL /api/tracks_info to tracks_info in views.py
        # API endpoint for JSON data
    # path('select_track/', views.select_track, name='select_track'),  
    # path('signup', views.signup, name = "signup"), # maps /signup to the signup view function in views.py
    # path('signin', views.signin, name = "signin"), # maps /signin to the signin view function in views.py
    # path('signout', views.signout, name = "signout") # maps /signout to the signout view function in views.py

]

