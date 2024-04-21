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



class Notificaciones(models.Model):

    numero_solicitud = models.CharField(max_length=255)
    municipio = models.CharField(max_length=255)
    numero_radicacion = models.CharField(max_length=255, primary_key=True)
    numero_predial = models.CharField(max_length=255)
    tipo_tramite = models.CharField(max_length=255)
    tarea = models.CharField(max_length=255)
    estado_tarea = models.CharField(max_length=255)
    fecha_inicio_tarea = models.DateField(blank=True, null=True)
    
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