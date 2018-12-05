from rest_framework import viewsets
from hungry_pets.serializers import UserSerializer
from hungry_pets.serializers import PetSerializer
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User
from rest_framework.permissions import IsAdminUser

class AdminPetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class AdminUserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer