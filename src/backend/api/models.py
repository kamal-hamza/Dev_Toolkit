from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
class customUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, username, password=None, **kwargs):
        if not email:
            raise ValueError("Must include email")
        if not username:
            raise ValueError("Must include username")
        if not first_name:
            raise ValueError("Must include first name")
        if not last_name:
            raise ValueError("Must include last name")
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, username=username, **kwargs)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, first_name, last_name, username, password=None, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_active', True)
        kwargs.setdefault('is_superuser', True)
        return self.create_user(email, first_name, last_name, username, password, **kwargs)
        

class customUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=128)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = customUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    def __str__(self):
        return self.email

class tasks(models.Model):
    user = models.ForeignKey(customUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=128)
    deadline = models.DateField()

    def __str__(self):
        return self.title
    