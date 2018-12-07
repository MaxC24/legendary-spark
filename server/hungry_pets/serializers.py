from rest_framework import serializers
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User
from hungry_pets.models.breed import Breed
from hungry_pets.models.species import Species

class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ('name',)

class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ('name',)

class PetSerializer(serializers.ModelSerializer):
    breed = BreedSerializer(read_only=True)
    species = SpeciesSerializer(read_only=True)

    class Meta:
        model = Pet
        fields = ( 'id', 'age', 'breed', 'name', 'picture', 'price', 'species')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')