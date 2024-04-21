import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN } from "../../api/constants";
import { CirclesWithBar } from 'react-loader-spinner';
import { API_URL } from '../../api/api_data'
import '../../styles/Dropzone.css'

function CargarDatosComponent() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const onDrop = async (acceptedFiles) => {
    try {
      setLoading(true);
      const file = acceptedFiles[0];
      const token = localStorage.getItem(ACCESS_TOKEN);
      const formData = new FormData();
      formData.append('archivo', file);
      const response = await axios.post(`${API_URL}/files/files-datos-maestros/`, formData, {
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

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onDrop(files);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta el archivo aquí</p>
        ) : (
          <p>Arrastra y suelta un archivo aquí, o haz clic en el boton para seleccionarlo</p>
        )}
      </div>
      <button
        onClick={handleFileClick}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#333',
          color: '#ddd',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#ff8c00';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#333';
          }
        }}
      >
        Cargar archivo desde PC
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
          }}
        >
          <CirclesWithBar color="#FF0000" height="200" width="200" />
        </div>
      )}
    </div>
  );
}

export default CargarDatosComponent;

