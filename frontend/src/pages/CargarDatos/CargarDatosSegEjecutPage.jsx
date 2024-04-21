import React from "react";
import CargarDatosSegEjecutAComponent from "../../components/CargarDatos/CargarDatosSegEjecutAComponent";
import CargarDatosSegEjecutBComponent from '../../components/CargarDatos/CargarDatosSegEjecutBComponent';

import MigracionButtonSegEjecutoresA from '../../components/MigrarDatos/MigracionButtonSegEjecutoresA';
import '../../styles/MigracionPage.css';
import MigracionButtonSegEjecutoresB from '../../components/MigrarDatos/MigracionButtonSegEjecutoresB';
import '../../styles/MigracionPage.css';
function CargarDatosSegEjecutPage() {
  return (
    <div>
      <h1>Cargar Datos Recientes</h1>
      <CargarDatosSegEjecutBComponent />

      <h1>Migración de Datos Recientes a la Base de Datos</h1>
      <MigracionButtonSegEjecutoresB />

      <h1>Cargar Datos Antiguos</h1>
      <CargarDatosSegEjecutAComponent />

      <h1>Migración de Datos Antiguos a la Base de Datos</h1>
      <MigracionButtonSegEjecutoresA />
      
    </div>
  );
}

export default CargarDatosSegEjecutPage;
