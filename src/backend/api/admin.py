from django.contrib import admin
from .models import customUser, tasks

# Register your models here.
admin.site.register(customUser)
admin.site.register(tasks)