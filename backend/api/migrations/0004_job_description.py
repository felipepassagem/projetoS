# Generated by Django 4.0.3 on 2022-03-03 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_job_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='description',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]
