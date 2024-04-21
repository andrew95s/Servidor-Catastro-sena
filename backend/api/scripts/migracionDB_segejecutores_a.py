import os, csv ,sqlite3
import pandas as pd
import sqlite3

# Obtener la ruta del directorio del script actual
script_dir = os.path.dirname(os.path.abspath(__file__))

# Ir dos niveles hacia arriba para llegar al nivel raíz del proyecto
project_root = os.path.abspath(os.path.join(script_dir, os.pardir, os.pardir))

# Construir la ruta a la carpeta seguimiento_ejecutor_a_csv dentro de la carpeta files
csv_folder_path = os.path.join(project_root, 'files', 'seguimiento_ejecutor_a_csv')

# Ruta de la base de datos SQLite
sqlite_db_path = os.path.join(project_root,'db.sqlite3')

# Conectar a la base de datos SQLite
conn = sqlite3.connect(sqlite_db_path)
c = conn.cursor()
# Borrar todos los datos de la tabla
c.execute("DELETE FROM api_seguimientoejecutoresa")
# Ruta de la carpeta que contiene los archivos CSV (relativa al directorio actual)

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
                municipio = row[1].strip().replace('"', '')
                ejecutor = row[2].strip().replace('"', '')if row[2] else None
                tipo_tramite = row[3].strip().replace('"', '')
                numero_radicacion = row[4].strip().replace('"', '')
                tipo_avaluo = row[5].strip().replace('"', '')
                numero_predial = row[6].strip().replace('"', '')
                ultima_tarea_ejecutor = row[7].strip().replace('"', '') if row[7] else None
                fecha_inicio_tarea_de_ejecucion = row[8].strip().replace('"', '') if row[8] else None
                fecha_fin_tarea_de_ejecucion = row[9].strip().replace('"', '') if row[9] else None
                usuario_ultima_tarea = row[10].strip().replace('"', '') if row[10] else None
                ultima_tarea_del_proceso = row[11].strip().replace('"', '')
                fecha_inicio_ultima_tarea = row[12].strip().replace('"', '') if row[12] else None
                fecha_fin_ultima_tarea = row[13].strip().replace('"', '') if row[13] else None
                estado_tramite = row[14].strip().replace('"', '')
                
                # Insertar los datos en la tabla
                c.execute("INSERT OR IGNORE INTO api_seguimientoejecutoresa VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                          (territorial, municipio, ejecutor, tipo_tramite, numero_radicacion, tipo_avaluo, numero_predial, ultima_tarea_ejecutor, fecha_inicio_tarea_de_ejecucion, fecha_fin_tarea_de_ejecucion,usuario_ultima_tarea, ultima_tarea_del_proceso,fecha_inicio_ultima_tarea, fecha_fin_ultima_tarea, estado_tramite))
        # Eliminar el archivo CSV después de procesarlo
        os.remove(csv_file_path)
# Confirmar los cambios y cerrar la conexión
conn.commit()
conn.close()

print("Datos insertados correctamente en la base de datos.")

