from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializers
from . import models

# Create your views here.
class userAPI(APIView):
    def get(self, request):
        queryset = models.customUser.objects.all()
        serializer = serializers.customUserSerializer(queryset, many=True)
        return Response(serializer.data)
