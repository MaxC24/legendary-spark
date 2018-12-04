from django.db import models
from hungry_pets.models.user import User

class Profile(models.Model):
    user = models.OneToOneField("User", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255,  blank=True)

