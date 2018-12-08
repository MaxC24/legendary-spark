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
from hungry_pets.serializers import UserSerializer

class LoginViewSet(viewsets.ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(request)

class SignUpViewSet(viewsets.ViewSet):
    def create(self, request):
        user = User.objects.create_user(**request.data)
        user.save()
        profile = Profile(user=user)
        profile.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class AuthenticatedUserViewSet(viewsets.ViewSet):
    #get the a serialized object which contains both user and user profile data
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def list(self, request):
        profile = Profile.objects.get(user=request.user.id)
        return Response({
            "email": request.user.email,
            "isAdmin": request.user.is_superuser,
            "firstName": profile.first_name,
            "lastName": profile.last_name,
            "address": profile.address,
            "phone": profile.phone
        })

class UserIsAuthenticatedViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def list(self, request):
        return Response({
            "authenticated": True
        })

class UpdateProfileViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        pass

    def put(self, request):
        userProfile = Profile.objects.get(user__id=request.user.id)
        userProfile.first_name = request.data['firstName']
        userProfile.last_name = request.data['lastName']
        userProfile.address = request.data['address']
        userProfile.phone = request.data['phone']
        userProfile.save()
        return Response({
            "success": True
        })


class PetViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Pet.objects.all()
        serializer = PetSerializer(queryset, many=True)
        return Response(serializer.data)

class LikePetViewSet(PetViewSet):
    """
        Extends the petViewSet and allows user to like/unlike pet.
        request.data = { "petId": <Number> }
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,) 
    def put(self, request, pk=None):
        pet = Pet.objects.get(id=request.data['petId'])
        user = User.objects.get(id=request.user.id)
        if Pet.objects.filter(id=pet.id, users__id=user.id).exists():
            pet.users.remove(user)
        else:
            pet.users.add(user)
        pet.save()
        return Response({
            "liked": Pet.objects.filter(users__id=user.id).exists()
        })  

class PreferenceViewSet(viewsets.ViewSet):
    """
        Preferences route returning a list with current user's preferences ids.
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    def list(self, request):
        pets = Pet.objects.filter(users__id=request.user.id).values('id')
        return Response(map(lambda x: x['id'], pets))