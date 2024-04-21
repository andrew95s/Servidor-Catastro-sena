import React from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../../api/constants"; // Importa el token de autorización

const MigracionButtonSegEjecutoresB = () => {
  const ejecutarMigracion = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN); // Obtén el token de autorización almacenado en localStorage
      const response = await axios.post('http://localhost:8000/api/migrar-datos-seg-ejecutores-b/', {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Agrega el token de autorización a los encabezados de la solicitud
        }
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al ejecutar la migración:', error);
    }
  };

  return (
    <button onClick={ejecutarMigracion}>
      Migrar Datos Maestros
    </button>
  );
};

export default MigracionButtonSegEjecutoresB;