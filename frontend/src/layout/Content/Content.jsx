// Importa las librerías necesarias
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';
import Home from '../../pages/Home'; // Importa la página Home
import Apex from '../../pages/Apex'; // Importa la página Apex
import MigracionPage from '../../pages/MigracionPage'; // Importa la página MigracionPage

const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      {/* Aquí se definen las rutas */}

      <Routes>
        <Route path="/" element={<ContentMain />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apex" element={<Apex />} />
        <Route path="/migrar-datos-maestros" element={<MigracionPage />} />
      
      </Routes>
    </div>
  );
};

export default Content;

