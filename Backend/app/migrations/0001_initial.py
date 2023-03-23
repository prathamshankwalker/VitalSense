# Generated by Django 4.1.7 on 2023-03-23 09:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FamilyMemberModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('relaion', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
