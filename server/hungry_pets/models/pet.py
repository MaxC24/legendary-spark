from django.db import models
from hungry_pets.models.user import User
from hungry_pets.models.breed import Breed
from hungry_pets.models.species import Species

class Pet(models.Model):
    age = models.PositiveIntegerField(null=True)
    breed = models.ForeignKey('Breed', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    species = models.ForeignKey('Species', on_delete=models.CASCADE, null=True)
    users = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.name