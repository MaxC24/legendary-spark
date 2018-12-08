from django.contrib import admin
from hungry_pets.models.pet import Pet
from hungry_pets.models.user import User
from hungry_pets.models.profile import Profile

# Register your models here.
admin.site.register(Pet)
admin.site.register(User)
admin.site.register(Profile)
