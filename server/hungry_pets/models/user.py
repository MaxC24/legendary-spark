from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from hungry_pets.models.profile import Profile

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError('User must have an email address')
        user_obj = self.model(
            email = self.normalize_email(email)
        )
        user_obj.admin = is_admin
        user_obj.staff = is_staff
        user_obj.active = is_active
        user_obj.set_password(password)
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
            is_admin=True,
            is_staff=True
        )
        super_user_profile = Profile(user=user)
        super_user_profile.save()
        return user 

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    active = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    objects = UserManager()

    def __str__(self):
        return '{}: {}'.format(self.id, self.email)

    def get_full_name(self):
        return self.email
    
    def get_short_name(self):
        return self.email
    
    @property
    def is_active(self):
        return self.active
    
    @property    
    def is_superuser(self):
        return self.admin
    
    @property    
    def is_staff(self):
        return self.staff