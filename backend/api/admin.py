from django.contrib import admin

# Register your models here.
from .models import DatosMaestros,FileDatosMaestros,SeguimientoEjecutoresA,SeguimientoEjecutoresB,FilePDFGDB,FileSeguimientoEjecutoresA,FileSeguimientoEjecutoresB,Notificaciones

#VISUALIZACION DEL CRUD/ FORMULARIO EN EL PANEL ADMINISTRADOR

#zona de subir archivos asociados al apex csv to DB
admin.site.register(FileDatosMaestros)
admin.site.register(FileSeguimientoEjecutoresA)
admin.site.register(FileSeguimientoEjecutoresB)
#archivos que pasaran de pdf a shp
admin.site.register(FilePDFGDB)

#zona de formularios CRUD
admin.site.register(DatosMaestros)
admin.site.register(SeguimientoEjecutoresA)
admin.site.register(SeguimientoEjecutoresB)
admin.site.register(Notificaciones)