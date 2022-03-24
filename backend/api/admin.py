from django.contrib import admin
from .models import Client, Job
# Register your models here.

@admin.register(Client)
class clientModel(admin.ModelAdmin):
  list_display = ('name',)
  list_filter = ('name',)

  def __str__(self):
    return self.name

@admin.register(Job)
class clientModel(admin.ModelAdmin):
  list_display = ('user', 'client', 'job_type',)
  list_filter = ('client', 'job_type',)