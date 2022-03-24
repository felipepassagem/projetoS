from rest_framework import serializers
from .models import Client, Job
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from django.shortcuts import get_object_or_404

class ClientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Client
    fields = [ 'name','phone_number','email','description','address','city', 'id']


class JobSerializer(serializers.ModelSerializer):
  client = serializers.SlugRelatedField(slug_field='name', read_only=True)
  class Meta:
    model = Job
    fields = ['client', 'client_client', 'job_type', 'description', 'price', 'date_to_finish', 'entry_date', 'finish_date', 'is_finished', 'is_payed', 'id']


class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ['id', 'username', 'password']

    extra_kwargs = {'password':{
      'write_only': True,
      'required': True
    }
    }

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    Token.objects.create(user=user)
    return user