from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from rest_framework import generics, status
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
    return JsonResponse({'csrfToken': csrf_token}, status=status.HTTP_200_OK)

class create_user(generics.CreateAPIView):
    queryset = customUser.objects.all()
    serializer_class = customUserSerializer

    def perform_create(self, serializer):
        hashed_password = make_password(serializer.validated_data['password'])
        serializer.save(password=hashed_password)

class login_user(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and Password are required fields'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # print(email)
            # print(password)
            user = authenticate(request, email=email, password=password)
            print(user)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'User logged in successfully'},status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            
class return_tasks(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        date = request.data.get('day');
        if not date:
            return JsonResponse({'error': 'Invalid date passed'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(date)
            print(user)







