from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta,timezone,date

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
 
#=========================================================================================================

class DatosMaestros(models.Model):

    territorial = models.CharField(max_length=255)
    id_negocio = models.CharField(max_length=255)
    numero_solicitud = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    zona = models.CharField(max_length=255)
    numero_radicacion = models.CharField(max_length=255, primary_key=True)
    numero_predial = models.CharField(max_length=255)
    tipo_tramite = models.CharField(max_length=255)
    clasificacion = models.CharField(max_length=255)
    estado_tramite = models.CharField(max_length=255)
    estado_proceso = models.CharField(max_length=255)
    inicio_proceso = models.CharField(max_length=255)
    fin_proceso = models.CharField(max_length=255)
    tarea = models.CharField(max_length=255)
    estado_tarea = models.CharField(max_length=255)
    fecha_inicio_tarea = models.CharField(max_length=255)
    fecha_fin_tarea = models.CharField(max_length=255)
    dias_habiles = models.CharField(max_length=255)
    funcionario_radicador = models.CharField(max_length=255)
    usuario_propietario = models.CharField(max_length=255)
    numero_resolucion = models.CharField(max_length=255)
    fecha_resolucion = models.CharField(max_length=255)
    radicacion_masivo = models.CharField(max_length=255)
    folio_matricula = models.CharField(max_length=255)

    def dias_transcurridos(self):
        # Convertir las fechas de texto a objetos datetime
        formato_fecha = "%d/%m/%Y"
        fecha_inicio_tarea = datetime.strptime(self.fecha_inicio_tarea, formato_fecha).date()
        hoy = datetime.now().date()

        # Calcular días calendario transcurridos
        diferencia = hoy - fecha_inicio_tarea
        dias_calendario = diferencia.days

        # Calcular días hábiles transcurridos
        dias_habiles = 0
        fecha_iterativa = fecha_inicio_tarea
        while fecha_iterativa <= hoy:
            if fecha_iterativa.weekday() < 5:  # Días de lunes a viernes
                dias_habiles += 1
            fecha_iterativa += timedelta(days=1)

        return dias_calendario, dias_habiles

    def __str__(self):
        tipo_tramite = self.tipo_tramite
        radicado = self.numero_radicacion
        dias_calendario, dias_habiles = self.dias_transcurridos()
        return f'Tipo Tramite: {tipo_tramite} - {radicado}, \n Transcurrido: {dias_calendario} días calendario y {dias_habiles} días hábiles desde la fecha de inicio'


class FileDatosMaestros(models.Model):
    id = models.AutoField(primary_key=True)
    archivo = models.FileField(upload_to='files/archivos_csv/', default='default.csv')
    fecha_subida = models.TextField(default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), editable=False)

    def __str__(self):
        archivo = self.archivo.name.split('/')[-1]  # Obtener solo el nombre del archivo sin la ruta
        fecha_subida = self.fecha_subida
        return f'{archivo} - Subido el: {fecha_subida}'

#===================================================================================================================================

class SeguimientoEjecutoresA(models.Model):
    territorial = models.CharField(max_length=255, blank=True)
    municipio = models.CharField(max_length=255, blank=True)
    ejecutor = models.CharField(max_length=255, blank=True)
    tipo_tramite = models.CharField(max_length=255, blank=True)
    numero_radicacion = models.CharField(max_length=255, primary_key=True)
    tipo_avaluo = models.CharField(max_length=255, blank=True)
    numero_predial = models.CharField(max_length=255, blank=True)
    ultima_tarea_ejecutor = models.CharField(max_length=255, blank=True)
    fecha_inicio_tarea_de_ejecucion = models.CharField(max_length=255, default="-", null=True, blank=True)
    fecha_fin_tarea_de_ejecucion = models.CharField(max_length=255, default="-", null=True, blank=True)
    usuario_ultima_tarea = models.CharField(max_length=255, blank=True)
    ultima_tarea_del_proceso = models.CharField(max_length=255, blank=True)
    fecha_inicio_ultima_tarea = models.CharField(max_length=255, default="-", null=True, blank=True)
    fecha_fin_ultima_tarea = models.CharField(max_length=255, default="-", null=True, blank=True)
    estado_tramite = models.CharField(max_length=255, blank=True)

    def __str__(self):
        numero_radicacion = self.numero_radicacion
        ejecutor = self.ejecutor
        fecha_inicio_tarea_ejecucion = self.fecha_inicio_tarea_de_ejecucion
        return f'Radicado: {numero_radicacion}, Ejecutor: ¨{ejecutor} \n Desde: {fecha_inicio_tarea_ejecucion}'
    
class FileSeguimientoEjecutoresA(models.Model):
    id = models.AutoField(primary_key=True)
    archivo = models.FileField(upload_to='files/seguimiento_ejecutor_a_csv/', default='default.csv')
    fecha_subida = models.TextField(default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), editable=False)

    def __str__(self):
        archivo = self.archivo.name.split('/')[-1]  # Obtener solo el nombre del archivo sin la ruta
        fecha_subida = self.fecha_subida
        return f'{archivo} - Subido el: {fecha_subida}'
    
class SeguimientoEjecutoresB(models.Model):
    territorial = models.CharField(max_length=255, blank=True)
    municipio = models.CharField(max_length=255, blank=True)
    ejecutor = models.CharField(max_length=255, blank=True)
    tipo_tramite = models.CharField(max_length=255, blank=True)
    numero_radicacion = models.CharField(max_length=255, primary_key=True)
    tipo_avaluo = models.CharField(max_length=255, blank=True)
    numero_predial = models.CharField(max_length=255, blank=True)
    ultima_tarea_ejecutor = models.CharField(max_length=255, blank=True)
    fecha_inicio_tarea_de_ejecucion = models.CharField(max_length=255, default="-", null=True, blank=True)
    fecha_fin_tarea_de_ejecucion = models.CharField(max_length=255, default="-", null=True, blank=True)
    usuario_ultima_tarea = models.CharField(max_length=255, blank=True)
    ultima_tarea_del_proceso = models.CharField(max_length=255, blank=True)
    fecha_inicio_ultima_tarea = models.CharField(max_length=255, default="-", null=True, blank=True)
    fecha_fin_ultima_tarea = models.CharField(max_length=255, default="-", null=True, blank=True)
    estado_tramite = models.CharField(max_length=255, blank=True)

    def __str__(self):
        numero_radicacion = self.numero_radicacion
        ejecutor = self.ejecutor
        fecha_inicio_tarea_ejecucion = self.fecha_inicio_tarea_de_ejecucion
        return f'Radicado: {numero_radicacion}, Ejecutor: ¨{ejecutor} \n Desde: {fecha_inicio_tarea_ejecucion}'


class FileSeguimientoEjecutoresB(models.Model):
    id = models.AutoField(primary_key=True)
    archivo = models.FileField(upload_to='files/seguimiento_ejecutor_b_csv/', default='default.csv')
    fecha_subida = models.TextField(default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), editable=False)

    def __str__(self):
        archivo = self.archivo.name.split('/')[-1]  # Obtener solo el nombre del archivo sin la ruta
        fecha_subida = self.fecha_subida
        return f'{archivo} - Subido el: {fecha_subida}'


#========NOTIFICACIONES=======================================================================
    
class Notificaciones(models.Model):

    numero_solicitud = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    numero_radicacion = models.CharField(max_length=255, primary_key=True)
    numero_predial = models.CharField(max_length=255)
    tipo_tramite = models.CharField(max_length=255)
    tarea = models.CharField(max_length=255)
    estado_tarea = models.CharField(max_length=255)
    fecha_inicio_tarea = models.DateField(blank=True, null=True)
    usuario_propietario = models.CharField(max_length=255)
    numero_resolucion = models.CharField(max_length=255)

    def dias_transcurridos(self):
        fecha_inicio_tarea = self.fecha_inicio_tarea
        if fecha_inicio_tarea:
            hoy = datetime.now().date()

            # Calcular días calendario transcurridos
            diferencia = hoy - fecha_inicio_tarea
            dias_calendario = diferencia.days

            # Calcular días hábiles transcurridos
            dias_habiles = 0
            fecha_iterativa = fecha_inicio_tarea
            while fecha_iterativa <= hoy:
                if fecha_iterativa.weekday() < 5:  # Días de lunes a viernes
                    dias_habiles += 1
                fecha_iterativa += timedelta(days=1)

            return dias_calendario, dias_habiles
        return None, None

    def __str__(self):
        tipo_tramite = self.tipo_tramite
        radicado = self.numero_radicacion
        dias_calendario, dias_habiles = self.dias_transcurridos()
        return f'Tipo Tramite: {tipo_tramite} - {radicado}, \n Transcurrido: {dias_calendario} días calendario y {dias_habiles} días hábiles desde la fecha de inicio'


    
#pdfs que contienen las gdbs====================================================================================
class FilePDFGDB(models.Model):
    id = models.AutoField(primary_key=True)
    archivo = models.FileField(upload_to='files/archivos_pdf/', default='default.pdf')
    fecha_subida = models.TextField(default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), editable=False)

    def __str__(self):
        archivo = self.archivo.name.split('/')[-1]  # Obtener solo el nombre del archivo sin la ruta
        fecha_subida = self.fecha_subida
        return f'{archivo} - Subido el: {fecha_subida}'