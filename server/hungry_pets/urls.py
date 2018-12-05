from django.conf.urls import url
from django.conf.urls import include
from django.urls import path
from . import admin_urls

from rest_framework.routers import DefaultRouter, SimpleRouter
from . import views

router = DefaultRouter()

router.register('login', views.LoginViewSet, base_name='login')
router.register('auth', views.AuthenticatedUserViewSet, base_name='auth') 
router.register('is-authenticated', views.UserIsAuthenticatedViewSet, base_name='is-authenticated') 
router.register('pet', views.PetViewSet, base_name='pet')

urlpatterns = [
    url(r'', include(router.urls)),
    path('admin/', include(admin_urls))
]