from django.db import models
from hungry_pets.models.user import User

class Pet(models.Model):
    age = models.PositiveIntegerField(null=True)
    breed = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    species = models.CharField(max_length=100)
    users = models.ManyToManyField(User, blank=True)
    adoption = models.BooleanField(default=False)

    def __str__(self):
        return self.name