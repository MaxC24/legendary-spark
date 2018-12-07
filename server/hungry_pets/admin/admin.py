from django.contrib import admin
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User

# Register your models here.
admin.site.register(Pet)
admin.site.register(User)