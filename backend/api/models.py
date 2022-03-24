from http import client
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.forms import EmailField
from phonenumber_field.modelfields import PhoneNumberField
from djmoney.models.fields import MoneyField

# Create your models here.
class Client(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=100, blank=True, null=True, unique=True)
  phone_number = PhoneNumberField(null=True, blank=True)
  email = models.EmailField(null=True, blank=True)
  description = models.TextField(null=True, blank=True)
  address = models.CharField(max_length=150, blank=True, null=True)
  city = models.CharField(max_length=50, null=True, blank=True)
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

  def __str__(self):
    return self.name

class Job(models.Model):
  user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
  client = models.ForeignKey(Client,null=True, on_delete=models.SET_NULL)
  client_client = models.CharField(max_length=150, null=True, blank=True)
  job_type = models.CharField(max_length=50, null=True, blank=True)
  description = models.TextField(blank=True, null=True)
  price = MoneyField(max_digits=14, decimal_places=2, default_currency='BRL')
  date_to_finish = models.DateField(auto_now=False, blank=True, null=True)
  entry_date = models.DateField(auto_now=True)
  finish_date = models.DateField(auto_now=False, blank=True, null=True)
  is_finished = models.BooleanField(default=False)
  is_payed = models.BooleanField(default=False)
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

  def __str__(self):
    return str(self.entry_date)
