# Generated by Django 4.0.3 on 2022-03-18 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_client_id_alter_job_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='phone_number',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]