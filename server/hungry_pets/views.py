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
        serializer = UserSerializer(user)
        return Response(serializer.data)

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
                "firstName": profile.first_name,
                "lastName": profile.last_name,
                "address": profile.address,
            })
        else:
            return Response({
                "email": request.user.email,
                "isAdmin": request.user.is_superuser,
            })

class UserIsAuthenticatedViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def list(self, request):
        return Response({
            "authenticated": True
        })

class PetViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Pet.objects.all().prefetch_related('breed', 'species')
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
        pet = Pet.objects.get(id=request.data['pet_id'])
        user = User.objects.get(id=request.user.id)
        if Pet.objects.filter(users__id=user.id).exists():
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
        return Response({
            "preferences": map(lambda x: x['id'], pets)
        })