# Generated by Django 5.0.3 on 2024-04-01 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_alter_filedatosmaestros_fecha_subida_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filedatosmaestros',
            name='fecha_subida',
            field=models.TextField(default='2024-04-01 11:58:20', editable=False),
        ),
        migrations.AlterField(
            model_name='filepdfgdb',
            name='fecha_subida',
            field=models.TextField(default='2024-04-01 11:58:20', editable=False),
        ),
        migrations.AlterField(
            model_name='fileseguimientoejecutoresa',
            name='fecha_subida',
            field=models.TextField(default='2024-04-01 11:58:20', editable=False),
        ),
        migrations.AlterField(
            model_name='fileseguimientoejecutoresb',
            name='fecha_subida',
            field=models.TextField(default='2024-04-01 11:58:20', editable=False),
        ),
    ]