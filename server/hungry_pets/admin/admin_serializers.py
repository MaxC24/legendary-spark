from rest_framework import serializers
from hungry_pets.models.pet import Pet

class AdminPetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pet
        fields = ( 'id', 'age', 'breed', 'name', 'picture', 'price', 'species', 'users', 'adoption')