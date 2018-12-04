from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User
from hungry_pets.models.profile import Profile

from hungry_pets.serializers import PetSerializer

class LoginViewSet(viewsets.ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(request)


class AuthenticatedUserViewSet(viewsets.ViewSet):
    #get the a serialized object which contains both user and user profile data
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def list(self, request):
        if Profile.objects.filter(user_id=request.user.id).exists():
            profile = Profile.objects.get(user=request.user.id)
            return Response({
                "email": request.user.email,
                "isAdmin": request.user.is_superuser,
                "isStaff": request.user.is_staff,
                "firstName": profile.first_name,
                "lastName": profile.last_name,
                "address": profile.address,
            })
        else:
            return Response({
                "email": request.user.email,
                "isAdmin": request.user.is_superuser,
                "isStaff": request.user.is_staff,
            })

class UserIsAuthenticatedViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def list(self, request):
        return Response({
            "authenticated": True
        })

class PetViewSet(viewsets.ViewSet):
    permission_classes = (IsAdminUser, )
    def list(self, request):
        queryset = Pet.objects.all()
        serializer = PetSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        return Response(request.data)

