from django.contrib import admin
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User
from hungry_pets.models.breed import Breed
from hungry_pets.models.species import Species

# Register your models here.
admin.site.register(Pet)
admin.site.register(User)
admin.site.register(Breed)
admin.site.register(Species)