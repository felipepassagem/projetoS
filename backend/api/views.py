from http import client
from urllib import request
from webbrowser import get
from wsgiref.util import request_uri
from django.shortcuts import render


# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import Client, Job
from .serializers import ClientSerializer, JobSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response



class ClientViewSet(viewsets.ModelViewSet):
  def get_queryset(self):
    user = self.request.user
    queryset = Client.objects.all().filter(user=user)
    return queryset
  if IsAuthenticated:
        # Autofill FK Client.
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
  def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class JobViewSet(viewsets.ModelViewSet):
  def get_queryset(self):
      user = self.request.user
      queryset = Job.objects.all().filter(user=user)
      return queryset
  if IsAuthenticated:
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
  def perform_create(self, serializer):
      client = get_object_or_404(Client, name=self.request.data.get('client'))
      serializer.save(user=self.request.user, client=client)

  def perform_update(self, serializer):
      client = get_object_or_404(Client, name=self.request.data.get('client'))
      serializer.save(user=self.request.user, client=client)

class UserViewSet(viewsets.ModelViewSet):
  def get_queryset(self):
        user = self.request.user
        queryset = User.objects.all().filter(user=user)
        return queryset, user
  if IsAuthenticated:
    serializer_class = UserSerializer




#

