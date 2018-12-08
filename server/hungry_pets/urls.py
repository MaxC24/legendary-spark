from django.conf.urls import url
from django.conf.urls import include
from django.urls import path
from hungry_pets.admin import admin_urls

from rest_framework.routers import DefaultRouter, SimpleRouter
from . import views

router = DefaultRouter()

router.register('login', views.LoginViewSet, base_name='login')
router.register('signup', views.SignUpViewSet, base_name='signup')
router.register('auth', views.AuthenticatedUserViewSet, base_name='auth') 
router.register('is-authenticated', views.UserIsAuthenticatedViewSet, base_name='is-authenticated') 
router.register('pet', views.PetViewSet, base_name='pet')
router.register('like-pet', views.LikePetViewSet, base_name='like-pet')
router.register('preference', views.PreferenceViewSet, base_name='preference')
router.register('profile', views.UpdateProfileViewSet, base_name='profile')

urlpatterns = [
    url(r'', include(router.urls)),
    path('admin/', include(admin_urls))
]