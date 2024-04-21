from django.shortcuts import render
from django.core.paginator import Paginator
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import UserSerializer, NoteSerializer, DatosMaestrosSerializer, FilesSerializerDMaestros,SeguimientoEjecutoresASerializer,SeguimientoEjecutoresBSerializer,FilesSerializerPDFGDB,FilesSerializerSeguimientoEjecutoresA,FilesSerializerSeguimientoEjecutoresB,DatosNotificacionesSerializaer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, DatosMaestros, FileDatosMaestros, Notificaciones
from .models import SeguimientoEjecutoresA,SeguimientoEjecutoresB,FileSeguimientoEjecutoresA,FileSeguimientoEjecutoresB,FilePDFGDB
from django.http import JsonResponse
import subprocess, os


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



#=== CARGAR ARCHIVO DATOS MAESTROS ===========================================
class FilesViewSetDMaestros(viewsets.ModelViewSet):
    queryset = FileDatosMaestros.objects.all()
    serializer_class = FilesSerializerDMaestros

#=== CARGAR ARCHIVO SEGUIMIENTO A EJECUTORES===========================================

class FilesViewSetSegEjecA(viewsets.ModelViewSet):
    queryset = FileSeguimientoEjecutoresA.objects.all()
    serializer_class = FilesSerializerSeguimientoEjecutoresA

class FilesViewSetSegEjecB(viewsets.ModelViewSet):
    queryset = FileSeguimientoEjecutoresB.objects.all()
    serializer_class = FilesSerializerSeguimientoEjecutoresB

#==================cargar pdfs  que contienen gdb =============================
class FilesViewSetPDFGDB(viewsets.ModelViewSet):
    queryset = FilePDFGDB.objects.all()
    serializer_class = FilesSerializerPDFGDB


#====================SEGUIMIENTO A EJECUTORES  FORM====================

class SeguimientoEjecutoresAListCreate(generics.ListCreateAPIView):
    queryset = SeguimientoEjecutoresA.objects.all()
    serializer_class = SeguimientoEjecutoresASerializer

    #Puede que falta incluir funciones como en el primer ejemplo


class SeguimientoEjecutoresARetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = SeguimientoEjecutoresA.objects.all()
    serializer_class = SeguimientoEjecutoresASerializer


class SeguimientoEjecutoresBListCreate(generics.ListCreateAPIView):
    queryset = SeguimientoEjecutoresA.objects.all()
    serializer_class = SeguimientoEjecutoresASerializer

    #Puede que falta incluir funciones como en el primer ejemplo


class SeguimientoEjecutoresBRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = SeguimientoEjecutoresB.objects.all()
    serializer_class = SeguimientoEjecutoresBSerializer




#========================DATOS MAESTROS APEX FORM=============================================

class DatosMaestrosListCreate(generics.ListCreateAPIView):
    queryset = DatosMaestros.objects.all()
    serializer_class = DatosMaestrosSerializer
    permission_classes = [IsAuthenticated]
    #Puede que falta incluir funciones como en el primer ejemplo

    def get_queryset(self):
        queryset = DatosMaestros.objects.all()
        
        # Obtener parámetros de consulta
        numero_radicacion = self.request.query_params.get('numero_radicacion')
        numero_predial = self.request.query_params.get('numero_predial')
        zona = self.request.query_params.get('zona')
        estado_tramite = self.request.query_params.get('estado_tramite')
        estado_proceso = self.request.query_params.get('estado_proceso')
        estado_tarea = self.request.query_params.get('estado_tarea')
        municipio = self.request.query_params.get('municipio')
        tipo_tramite = self.request.query_params.get('tipo_tramite')
        tarea = self.request.query_params.get('tarea')
        
        # Aplicar filtros si están presentes en los parámetros de consulta
        if municipio:
            queryset = queryset.filter(municipio__icontains=municipio)
        if tipo_tramite:
            queryset = queryset.filter(tipo_tramite__icontains=tipo_tramite)
        if tarea:
            queryset = queryset.filter(tarea__icontains=tarea)
        if zona:
            queryset = queryset.filter(zona__icontains=zona)
        if estado_tramite:
            queryset = queryset.filter(estado_tramite__icontains=estado_tramite)
        if estado_proceso:
            queryset = queryset.filter(estado_proceso__icontains=estado_proceso)
        if estado_tarea:
            queryset = queryset.filter(estado_tarea__icontains=estado_tarea)
        if numero_radicacion:
            queryset = queryset.filter(numero_radicacion__icontains=numero_radicacion)
        if numero_predial:
            queryset = queryset.filter(numero_predial__icontains=numero_predial)
        
        return queryset

class DatosMaestrosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = DatosMaestros.objects.all()
    serializer_class = DatosMaestrosSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'numero_radicacion'

    def put(self, request, *args, **kwargs):
        try:
            instance = self.get_object()  # Obtiene el objeto Notificaciones utilizando 'numero_radicacion'
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Notificaciones.DoesNotExist:
            return Response({"error": "Objeto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

#========================NOTIFICACIONES APEX FORM=============================================
class DatosNotificacionesListCreate(generics.ListCreateAPIView):
    queryset = Notificaciones.objects.all()
    serializer_class = DatosNotificacionesSerializaer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Notificaciones.objects.all()
        
        # Obtener parámetros de consulta
        numero_radicacion = self.request.query_params.get('numero_radicacion')
        municipio = self.request.query_params.get('municipio')
        tipo_tramite = self.request.query_params.get('tipo_tramite')
        tarea = self.request.query_params.get('tarea')
        
        # Aplicar filtros si están presentes en los parámetros de consulta
        if municipio:
            queryset = queryset.filter(municipio__icontains=municipio)
        if tipo_tramite:
            queryset = queryset.filter(tipo_tramite__icontains=tipo_tramite)
        if tarea:
            queryset = queryset.filter(tarea__icontains=tarea)
        if numero_radicacion:
            queryset = queryset.filter(numero_radicacion__icontains=numero_radicacion)
        
        return queryset


class DatosNotificacionesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notificaciones.objects.all()
    serializer_class = DatosNotificacionesSerializaer
    permission_classes = [IsAuthenticated]
    lookup_field = 'numero_radicacion'

    def put(self, request, *args, **kwargs):
        try:
            instance = self.get_object()  # Obtiene el objeto Notificaciones utilizando 'numero_radicacion'
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Notificaciones.DoesNotExist:
            return Response({"error": "Objeto no encontrado"}, status=status.HTTP_404_NOT_FOUND)


#==================Zona de scripts Fronent to Backend=================================================================
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])

def script_migracionDB_DMaestros(request):
    if request.method == 'POST':
        try:
            # Directorio donde se encuentra el script migracionDB.py
            script_directory = os.path.join(os.path.dirname(__file__), 'scripts')
            script_path = os.path.join(script_directory, 'migracionDB.py')

            # Ejecutar el script de Python
            subprocess.run(['python', script_path])

            return JsonResponse({'success': True, 'message': 'Script ejecutado correctamente'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Método HTTP no permitido'})
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def script_migracionDB_SegEjecutoresA(request):
    if request.method == 'POST':
        try:
            # Directorio donde se encuentra el script migracionDB.py
            script_directory = os.path.join(os.path.dirname(__file__), 'scripts')
            script_path = os.path.join(script_directory, 'migracionDB_segejecutores_a.py')

            # Ejecutar el script de Python
            subprocess.run(['python', script_path])

            return JsonResponse({'success': True, 'message': 'Script ejecutado correctamente'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Método HTTP no permitido'})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def script_migracionDB_SegEjecutoresB(request):
    if request.method == 'POST':
        try:
            # Directorio donde se encuentra el script migracionDB.py
            script_directory = os.path.join(os.path.dirname(__file__), 'scripts')
            script_path = os.path.join(script_directory, 'migracionDB_segejecutores_b.py')

            # Ejecutar el script de Python
            subprocess.run(['python', script_path])

            return JsonResponse({'success': True, 'message': 'Script ejecutado correctamente'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Método HTTP no permitido'})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def script_pdf_to_shp(request):
    if request.method == 'POST':
        try:
            # Directorio donde se encuentra el script migracionDB.py
            script_directory = os.path.join(os.path.dirname(__file__), 'scripts')
            script_path = os.path.join(script_directory, 'pdf_to_shp.py')

            # Ejecutar el script de Python
            subprocess.run(['python', script_path])

            return JsonResponse({'success': True, 'message': 'Script ejecutado correctamente'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Método HTTP no permitido'})