from rest_framework import viewsets
from hungry_pets.serializers import UserSerializer
from hungry_pets.serializers import PetSerializer
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from .admin_serializers import AdminPetSerializer
from rest_framework.response import Response

class AdminPetViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)
    queryset = Pet.objects.all()
    serializer_class = AdminPetSerializer


class AdminUserViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

