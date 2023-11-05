# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/tracks_info', views.tracks_info, name='tracks_info'),  # API endpoint for JSON data
    # path('select_track/', views.select_track, name='select_track'),  # If you have this view
    path('signup', views.signup, name = "signup"),
    path('signin', views.signin, name = "signin"),
    path('signout', views.signout, name = "signout")
]

