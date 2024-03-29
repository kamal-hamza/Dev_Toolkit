from django.urls import path
from . import views

urlpatterns = [
    path('userAPI/', views.userAPI.as_view(), name='userAPI'),
    path('create_user/', views.create_user.as_view(), name='create_user'),
    path('csrfToken/', views.get_csrf_token, name='get_csrf_token'),
    path('login_user/', views.login_user.as_view(), name='login_user'),
    path('tasksAPI/', views.tasksAPI.as_view(), name='tasksAPI'),
    path('return_tasks/', views.return_tasks.as_view(), name='return_tasks'),
    path('create_task/', views.create_task.as_view(), name='create_task'),
    path('return_user/', views.return_user.as_view(), name='return_user'),
]