from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, DatosMaestros,FileDatosMaestros,Notificaciones
from .models import SeguimientoEjecutoresA,SeguimientoEjecutoresB,FileSeguimientoEjecutoresA,FileSeguimientoEjecutoresB,FilePDFGDB
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}




class FilesSerializerDMaestros(serializers.ModelSerializer):
    class Meta:
        model = FileDatosMaestros
        fields = ('id', 'archivo', 'fecha_subida')

class FilesSerializerSeguimientoEjecutoresA(serializers.ModelSerializer):
    class Meta:
        model = FileSeguimientoEjecutoresA
        fields = ('id', 'archivo', 'fecha_subida')
class FilesSerializerSeguimientoEjecutoresB(serializers.ModelSerializer):
    class Meta:
        model = FileSeguimientoEjecutoresB
        fields = ('id', 'archivo', 'fecha_subida')
class FilesSerializerPDFGDB(serializers.ModelSerializer):
    class Meta:
        model = FilePDFGDB
        fields = ('id', 'archivo', 'fecha_subida')      


class DatosMaestrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosMaestros
        fields = "__all__"

class SeguimientoEjecutoresASerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguimientoEjecutoresA
        fields = "__all__"

class SeguimientoEjecutoresBSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguimientoEjecutoresB
        fields = "__all__"


class DatosNotificacionesSerializaer(serializers.ModelSerializer):
    class Meta:
        model = Notificaciones
        fields = "__all__"