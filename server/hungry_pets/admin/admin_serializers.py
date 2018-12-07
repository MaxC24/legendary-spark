from rest_framework import serializers
from hungry_pets.models.pet import Pet
from hungry_pets.serializers import BreedSerializer, SpeciesSerializer

class AdminPetSerializer(serializers.ModelSerializer):
    breed = BreedSerializer(read_only=True)
    species = SpeciesSerializer(read_only=True)

    class Meta:
        model = Pet
        fields = ( 'id', 'age', 'breed', 'name', 'picture', 'price', 'species', 'users')