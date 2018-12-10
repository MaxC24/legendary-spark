from rest_framework import serializers
from hungry_pets.models.pet import Pet

class AdminPetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pet
        fields = ( 'id', 'age', 'breed', 'name', 'picture', 'price', 'species', 'users', 'adoption')
    
    def update(self, instance, validated_data):
        # removes the users field
        validated_data.pop('users', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance 