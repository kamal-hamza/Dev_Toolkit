from django.urls import path
from . import views

urlpatterns = [
    path('userAPI/', views.userAPI.as_view(), name='userAPI'),
]