import React from "react";
import Sidebar from '../../layout/Sidebar/Sidebar';
import CargarDatosComponent from "../../components/CargarDatos/CargarDatosComponent";
import MigracionButton from '../../components/MigrarDatos/MigracionButton';
import '../../styles/MigracionPage.css';

function CargarDatosPage() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h1>Cargar Datos</h1>
        <CargarDatosComponent />
        <h1>Migración de Datos Maestros a la Base de Datos</h1>
        <MigracionButton />
      </div>
    </div>
  );
}

export default CargarDatosPage;
