from rest_framework import serializers
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ( 'id', 'age', 'breed', 'name', 'picture', 'price', 'species', 'adoption')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')