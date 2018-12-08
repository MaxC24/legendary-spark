from django.db import models

class Profile(models.Model):
    user = models.OneToOneField("User", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255,  blank=True)
    phone = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.email

