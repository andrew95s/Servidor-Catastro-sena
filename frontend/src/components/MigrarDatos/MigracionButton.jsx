import React from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../../api/constants";
import Swal from 'sweetalert2'; // Importa SweetAlert2

const MigracionButton = () => {
  const ejecutarMigracion = async () => {
    const confirmar = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción borrará la base de datos, Para Ingresar Datos Actualizados. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmar.isConfirmed) {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const response = await axios.post('http://localhost:8000/api/migrar-datos-maestros-db/', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data.message);
        Swal.fire('Éxito', 'La migración se ha completado correctamente', 'success');
      } catch (error) {
        console.error('Error al ejecutar la migración:', error);
        Swal.fire('Error', 'Ocurrió un error al ejecutar la migración', 'error');
      }
    }
  };

  return (
    <button
      onClick={ejecutarMigracion}
      style={{
        backgroundColor: '#003366',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#800000';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#003366';
      }}
    >
      Procesar Datos!
    </button>
  );
};

export default MigracionButton;
