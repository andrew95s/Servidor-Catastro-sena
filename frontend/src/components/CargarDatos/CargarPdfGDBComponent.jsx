import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN } from "../../api/constants"; // Importar ACCESS_TOKEN
import { CirclesWithBar } from 'react-loader-spinner'; // Importar CirclesWithBar
import { API_URL } from '../../api/api_data'
import '../../styles/Dropzone.css'; // Importar el archivo CSS

function CargarPdfGDBComponent() {
    const [loading, setLoading] = useState(false);

    const onDrop = async (acceptedFiles) => {
        try {
            setLoading(true);
            const file = acceptedFiles[0];
            const token = localStorage.getItem(ACCESS_TOKEN);
            const formData = new FormData();
            formData.append('archivo', file);

            const response = await axios.post(`${API_URL}/files/files-pdfsDGB/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Data uploaded successfully:', response.data);
            Swal.fire('Éxito', 'Archivo subido correctamente', 'success');
        } catch (error) {
            console.error('Error uploading data:', error);
            Swal.fire('Error', 'Ocurrió un error al subir el archivo', 'error');
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} className="dropzone"> {/* Aplicar la clase dropzone */}
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Suelta el archivo aquí</p> :
                        <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionarlo</p>
                }
            </div>
            <button onClick={() => {}} disabled={loading}>
                Cargar archivo
            </button>
            {loading && (
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20vh", // Establece la altura del contenedor para que ocupe toda la pantalla verticalmente
                  }}
                >
                  <CirclesWithBar color="#FF0000" height="200" width="200" />
                </div>
            )}
        </div>
    );
}

export default CargarPdfGDBComponent;
