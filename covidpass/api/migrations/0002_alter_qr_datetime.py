# Generated by Django 3.2.5 on 2021-07-08 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qr',
            name='datetime',
            field=models.DateTimeField(auto_created=True, verbose_name='Время создания кода'),
        ),
    ]
