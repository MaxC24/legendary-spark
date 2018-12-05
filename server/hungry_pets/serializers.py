from rest_framework import serializers
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ( 'age', 'breed', 'name', 'picture', 'price', 'species')

    def create(self, validated_data):
        if many_to_many:
            for field_name, value in many_to_many.items():
                field = getattr(instance, field_name)
                field.set(value)

        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')