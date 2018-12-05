from django.conf.urls import url
from django.conf.urls import include

from rest_framework.routers import DefaultRouter, SimpleRouter
from hungry_pets.admin import admin_views

router = DefaultRouter()

router.register('pet', admin_views.AdminPetViewSet)
router.register('user', admin_views.AdminUserViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]