# Generated by Django 4.0.3 on 2022-03-18 02:31

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_client_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='phone_number',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None),
        ),
    ]
