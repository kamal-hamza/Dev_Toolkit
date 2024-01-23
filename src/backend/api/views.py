from django.http import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import customUserSerializer, tasksSerializer
from . models import customUser, tasks
from django.middleware.csrf import get_token
from django.contrib.auth.hashers import make_password


# Create your views here.
class userAPI(APIView):
    def get(self, request):
        queryset = customUser.objects.all()
        serializer = customUserSerializer(queryset, many=True)
        return Response(serializer.data)
    
class tasksAPI(APIView):
    def get(self, request):
        queryset = tasks.objects.all()
        serializer = tasksSerializer(queryset, many=True)
        return Response(serializer.data)
    
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
class create_user(generics.CreateAPIView):
    queryset = customUser.objects.all()
    serializer_class = customUserSerializer

    def perform_create(self, serializer):
        hashed_password = make_password(serializer.validated_data['password'])
        serializer.save(password=hashed_password)


