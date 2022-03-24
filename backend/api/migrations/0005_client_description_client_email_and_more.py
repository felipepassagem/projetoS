# Generated by Django 4.0.3 on 2022-03-04 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_job_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='client',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]