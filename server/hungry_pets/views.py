from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from hungry_pets.models.pet import Pet 

class LoginViewSet(viewsets.ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(request)