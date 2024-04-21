from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views


# Aqui agregamos nuevas rutas para cargar archivos, tambien podemos crear rutas para otros fines  ej  gis7 inclure routers.urls      /files-gdb /files-shp /imagenes etc.
router = DefaultRouter()
router.register('files-datos-maestros',views.FilesViewSetDMaestros, basename='datos-maestros-list-create')
router.register('files-seguimiento-ejecutores-a', views.FilesViewSetSegEjecA, basename='seguimiento-ejecutores-upload-create-A')
router.register('files-seguimiento-ejecutores-b', views.FilesViewSetSegEjecB, basename='seguimiento-ejecutores-upload-create-B')
router.register('files-pdfsDGB', views.FilesViewSetPDFGDB, basename='pdfsgdb-upload')

#giserver = DefaultRouter()
#giserver.register('files-gis-kml', views.AQUI-FUNCIONENVIEWS, basename='pdfsgdb-upload')

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('datos-maestros/', views.DatosMaestrosListCreate.as_view(), name='datos-maestros-list-create'),
    path('datos-maestros/<str:pk>/', views.DatosMaestrosListCreate.as_view(), name='datos-maestros-list'),
    path('datos-maestros/<str:numero_radicacion>/delete-update', views.DatosMaestrosRetrieveUpdateDestroy.as_view(), name='datos-maestros-retrieve-update-destroy'),

    path('datos-notificaciones/', views.DatosNotificacionesListCreate.as_view(), name='datos-notificaciones-list-create'),
    path('datos-notificaciones/<int:pk>/', views.DatosNotificacionesListCreate.as_view(), name='datos-notificaciones-list'),
    path('datos-notificaciones/<str:numero_radicacion>/delete-update', views.DatosNotificacionesRetrieveUpdateDestroy.as_view(), name='datos-notificaciones-update'),
    #Aqui pondre algunos scripts que se podran ejecutar desde el frontend
    path('migrar-datos-maestros-db/', views.script_migracionDB_DMaestros, name='migrar_datos_maestros_db'),
    path('migrar-datos-seg-ejecutores-a/', views.script_migracionDB_SegEjecutoresA, name='migrar_datos_seguimiento_ejecutores_a'),
    path('migrar-datos-seg-ejecutores-b/', views.script_migracionDB_SegEjecutoresB, name='migrar_datos_seguimiento_ejecutores_b'),
    path('pdf-to-shp/', views.script_pdf_to_shp, name='convertir-pdf-to-shp'),
    #files aqui estaran los sub directorios para subir archivos ej files/files-pdfsDGB
    path('files/',include(router.urls)),
    #path('gis/',include(giserver.urls)),
]
