# Generated by Django 5.0.3 on 2024-03-28 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_filedatosmaestros_fecha_subida'),
    ]

    operations = [
        migrations.CreateModel(
            name='FilePDFGDB',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('archivo', models.FileField(default='default.pdf', upload_to='archivos_pdf/')),
                ('fecha_subida', models.TextField(default='2024-03-28 14:02:38', editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='FileSeguimientoEjecutoresA',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('archivo', models.FileField(default='default_a.csv', upload_to='seguimiento_ejecutor_a_csv/')),
                ('fecha_subida', models.TextField(default='2024-03-28 14:02:38', editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='FileSeguimientoEjecutoresB',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('archivo', models.FileField(default='default_b.csv', upload_to='seguimiento_ejecutor_b_csv/')),
                ('fecha_subida', models.TextField(default='2024-03-28 14:02:38', editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='SeguimientoEjecutoresA',
            fields=[
                ('territorial', models.CharField(blank=True, max_length=255)),
                ('municipio', models.CharField(blank=True, max_length=255)),
                ('ejecutor', models.CharField(blank=True, max_length=255)),
                ('tipo_tramite', models.CharField(blank=True, max_length=255)),
                ('numero_radicacion', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('tipo_avaluo', models.CharField(blank=True, max_length=255)),
                ('numero_predial', models.CharField(blank=True, max_length=255)),
                ('ultima_tarea_ejecutor', models.CharField(blank=True, max_length=255)),
                ('fecha_inicio_tarea_ejecucion', models.DateField(blank=True, null=True)),
                ('fecha_fin_tarea_ejecucion', models.DateField(blank=True, null=True)),
                ('usuario_ultima_tarea', models.CharField(blank=True, max_length=255)),
                ('ultima_tarea_proceso', models.CharField(blank=True, max_length=255)),
                ('fecha_inicio_ultima_tarea', models.DateField(blank=True, null=True)),
                ('fecha_fin_ultima_tarea', models.DateField(blank=True, null=True)),
                ('estado_tramite', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SeguimientoEjecutoresB',
            fields=[
                ('territorial', models.CharField(blank=True, max_length=255)),
                ('municipio', models.CharField(blank=True, max_length=255)),
                ('ejecutor', models.CharField(blank=True, max_length=255)),
                ('tipo_tramite', models.CharField(blank=True, max_length=255)),
                ('numero_radicacion', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('tipo_avaluo', models.CharField(blank=True, max_length=255)),
                ('numero_predial', models.CharField(blank=True, max_length=255)),
                ('ultima_tarea_ejecutor', models.CharField(blank=True, max_length=255)),
                ('fecha_inicio_tarea_ejecucion', models.DateField(blank=True, null=True)),
                ('fecha_fin_tarea_ejecucion', models.DateField(blank=True, null=True)),
                ('usuario_ultima_tarea', models.CharField(blank=True, max_length=255)),
                ('ultima_tarea_proceso', models.CharField(blank=True, max_length=255)),
                ('fecha_inicio_ultima_tarea', models.DateField(blank=True, null=True)),
                ('fecha_fin_ultima_tarea', models.DateField(blank=True, null=True)),
                ('estado_tramite', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='filedatosmaestros',
            name='fecha_subida',
            field=models.TextField(default='2024-03-28 14:02:38', editable=False),
        ),
    ]