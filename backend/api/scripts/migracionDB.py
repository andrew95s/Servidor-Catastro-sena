import csv
import sqlite3
import os

# Obtener la ruta del directorio del script actual
script_dir = os.path.dirname(os.path.abspath(__file__))

# Ir dos niveles hacia arriba para llegar al nivel raíz del proyecto
project_root = os.path.abspath(os.path.join(script_dir, os.pardir, os.pardir))

# Construir la ruta a la carpeta seguimiento_ejecutor_a_csv dentro de la carpeta files
csv_folder_path = os.path.join(project_root, 'files', 'archivos_csv')

# Ruta de la base de datos SQLite
sqlite_db_path = os.path.join(project_root, 'db.sqlite3')

# Conectar a la base de datos SQLite
conn = sqlite3.connect(sqlite_db_path)
c = conn.cursor()

# Borrar todos los datos de la tabla api_datosmaestros
c.execute("DELETE FROM api_datosmaestros")

# Iterar sobre todos los archivos CSV en la carpeta
for filename in os.listdir(csv_folder_path):
    if filename.endswith('.csv'):
        csv_file_path = os.path.join(csv_folder_path, filename)

        # Abrir el archivo CSV y leer sus filas
        with open(csv_file_path, 'r', encoding='latin-1') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            next(csv_reader)  # Saltar la fila de encabezados

            # Iterar sobre las filas del archivo CSV
            for row in csv_reader:
                # Normalizar los datos
                territorial = row[0].strip().replace('"', '')
                id_negocio = row[1].strip().replace('"', '')
                numero_solicitud = row[2].strip().replace('"', '')
                municipio = row[3].strip().replace('"', '')
                zona = row[4].strip().replace('"', '')
                numero_radicacion = row[5].strip().replace('"', '')
                numero_predial = row[6].strip().replace('"', '')
                tipo_tramite = row[7].strip().replace('"', '')
                clasificacion = row[8].strip().replace('"', '')
                estado_tramite = row[9].strip().replace('"', '')
                estado_proceso = row[10].strip().replace('"', '')
                inicio_proceso = row[11].strip().replace('"', '')
                fin_proceso = row[12].strip().replace('"', '') if row[12] else None
                tarea = row[13].strip().replace('"', '')
                estado_tarea = row[14].strip().replace('"', '')
                fecha_inicio_tarea = row[15].strip().replace('"', '')
                fecha_fin_tarea = row[16].strip().replace('"', '') if row[16] else None
                dias_habiles = row[17].strip().replace('"', '') if row[17].strip() else None
                funcionario_radicador = row[18].strip().replace('"', '')
                usuario_propietario = row[19].strip().replace('"', '') if row[19] else None
                numero_resolucion = row[20].strip().replace('"', '') if row[20] else None
                fecha_resolucion = row[21].strip().replace('"', '') if row[21] else None
                radicacion_masivo = row[22].strip().replace('"', '')
                folio_matricula = row[23].strip().replace('"', '')

                # Insertar los datos en la tabla api_datosmaestros
                c.execute("INSERT OR IGNORE INTO api_datosmaestros VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                          (territorial, id_negocio, numero_solicitud, municipio, zona, numero_radicacion, numero_predial, tipo_tramite, clasificacion, estado_tramite, estado_proceso, inicio_proceso, fin_proceso, tarea, estado_tarea, fecha_inicio_tarea, fecha_fin_tarea, dias_habiles, funcionario_radicador, usuario_propietario, numero_resolucion, fecha_resolucion, radicacion_masivo, folio_matricula))


# Confirmar los cambios en la tabla api_datosmaestros
conn.commit()

# Borrar todos los datos de la tabla api_notificaciones
c.execute("DELETE FROM api_notificaciones")

# Iterar sobre todos los archivos CSV en la carpeta
for filename in os.listdir(csv_folder_path):
    if filename.endswith('.csv'):
        csv_file_path = os.path.join(csv_folder_path, filename)
        # Abrir el archivo CSV y leer sus filas
        with open(csv_file_path, 'r', encoding='latin-1') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            next(csv_reader)  # Saltar la fila de encabezados
            # Iterar sobre las filas del archivo
            for row in csv_reader:
                # Normalizar los datos para la tabla api_notificaciones
                numero_solicitud = row[2].strip().replace('"', '')
                municipio = row[3].strip().replace('"', '')
                numero_radicacion = row[5].strip().replace('"', '')
                numero_predial = row[6].strip().replace('"', '')
                tipo_tramite = row[7].strip().replace('"', '')
                tarea = row[13].strip().replace('"', '')
                estado_tarea = row[14].strip().replace('"', '')
                fecha_inicio_tarea = row[15].strip().replace('"', '')
                usuario_propietario = row[19].strip().replace('"', '') if row[19] else None
                numero_resolucion = row[20].strip().replace('"', '') if row[20] else None

                # Convertir fecha_inicio_tarea a formato de fecha (día/mes/año)
                fecha_inicio_tarea = fecha_inicio_tarea.split('/')
                fecha_inicio_tarea = '{:04d}-{:02d}-{:02d}'.format(int(fecha_inicio_tarea[2]), int(fecha_inicio_tarea[1]), int(fecha_inicio_tarea[0]))

                # Insertar los datos en la tabla api_notificaciones
                c.execute("INSERT OR IGNORE INTO api_notificaciones (numero_solicitud, municipio, numero_radicacion, numero_predial, tipo_tramite, tarea, estado_tarea, fecha_inicio_tarea, usuario_propietario, numero_resolucion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                          (numero_solicitud, municipio, numero_radicacion, numero_predial, tipo_tramite, tarea, estado_tarea, fecha_inicio_tarea, usuario_propietario, numero_resolucion))
        # Eliminar el archivo CSV después de procesarlo
        os.remove(csv_file_path)

# Confirmar los cambios en la tabla api_notificaciones
conn.commit()

# Cerrar la conexión a la base de datos
conn.close()