from django import views
from django.urls import path, include
#from .views import 
from rest_framework.routers import DefaultRouter


from .views import ClientViewSet, JobViewSet, UserViewSet


router = DefaultRouter()
router.register('clients', ClientViewSet, basename='clients')
router.register('job', JobViewSet, basename='job')
router.register('users', UserViewSet, basename='users')

urlpatterns = [
  
  path('api/', include(router.urls)),
  

]