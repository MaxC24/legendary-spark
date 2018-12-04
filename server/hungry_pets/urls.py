from django.conf.urls import url
from django.conf.urls import include

from rest_framework.routers import DefaultRouter, SimpleRouter
from . import views

router = DefaultRouter()

router.register('login', views.LoginViewSet, base_name='login')

urlpatterns = [
    url(r'', include(router.urls)),
]