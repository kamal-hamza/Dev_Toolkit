from rest_framework import serializers
from .models import customUser, tasks

class customUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = customUser
        fields = ['email', 'first_name', 'last_name', 'username', 'password']

class tasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = tasks
        fields = ['user', 'title', 'description', 'deadline']

    