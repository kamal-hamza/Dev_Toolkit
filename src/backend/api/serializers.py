from rest_framework import serializers
from . import models

class customUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.customUser
        fields = ['email', 'first_name', 'last_name', 'username']

    