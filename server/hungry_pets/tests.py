from django.test import TestCase
from hungry_pets.models import Pet

# Create your tests here.

class PetTests(TestCase):

    def test_pet_model(self):
        """
        True is True
        """
        self.assertIs(True, False)

