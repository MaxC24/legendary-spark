from django.urls import path
from . import views

urlpatterns = [
    path('', views.index ),
    path('admin-page', views.index ),
    path('profile', views.index )
]