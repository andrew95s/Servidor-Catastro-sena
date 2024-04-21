import React from 'react';
import { BrowserRouter, Routes, Route, Outlet,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Apex from './pages/Apex';
import CargarDatosPage from './pages/CargarDatos/CargarDatosPage';
import MigracionPage from './pages/MigracionPage';
import CargarDatosSegEjecutPage from './pages/CargarDatos/CargarDatosSegEjecutPage';
import CargarPdfGDB from './pages/CargarDatos/CargarPdfGDB';
import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';
import Home from './components/Home/Home';
import Cards from './components/Cards/Cards';
import './App.css';
import CreateNotificaciones from './pages/Notificaciones/CreateNotificaciones';
import DeleteNotificacion from './pages/Notificaciones/DeleteNotificacion';
import Notificaciones from './pages/Notificaciones/Notificaciones';
import ShowNotificacion from './pages/Notificaciones/ShowNotificacion';
import EditNotificacion from './pages/Notificaciones/EditNotificacion'
//
import CreateTramite from './pages/Tramites/CreateTramites';
import DeleteTramite from './pages/Tramites/DeleteTramite';
import Tramites from './pages/Tramites/Tramites';
import ShowTramite from './pages/Tramites/ShowTramite';
import EditTramite from './pages/Tramites/EditTramite';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/notificaciones' element={<ProtectedRoute><Notificaciones /></ProtectedRoute>} />
        <Route path='/notificaciones/create' element={<ProtectedRoute><CreateNotificaciones /></ProtectedRoute>} />
        <Route path='/notificaciones/details/:id' element={<ProtectedRoute><ShowNotificacion /></ProtectedRoute>} />
        <Route path='/notificaciones/edit/:id' element={<ProtectedRoute><EditNotificacion /></ProtectedRoute>} />
        <Route path='/notificaciones/delete/:id' element={<ProtectedRoute><DeleteNotificacion /></ProtectedRoute>} />

        <Route path='/tramites' element={<ProtectedRoute><Tramites /></ProtectedRoute>} />
        <Route path='/tramites/create' element={<ProtectedRoute><CreateTramite /></ProtectedRoute>} />
        <Route path='/tramites/details/:id' element={<ProtectedRoute><ShowTramite  /></ProtectedRoute>} />
        <Route path='/tramites/edit/:id' element={<ProtectedRoute><EditTramite  /></ProtectedRoute>} />
        <Route path='/tramites/delete/:id' element={<ProtectedRoute><DeleteTramite  /></ProtectedRoute>} />

        <Route path="/apex" element={<ProtectedRoute><Apex /></ProtectedRoute>} />
        <Route path="/cargar-datos" element={<ProtectedRoute><CargarDatosPage /></ProtectedRoute>} />
        <Route path="/cargar-datos-seguimiento-ejecutores" element={<ProtectedRoute><CargarDatosSegEjecutPage /></ProtectedRoute>} />
        <Route path="/cargar-pdf-gdb" element={<ProtectedRoute><CargarPdfGDB /></ProtectedRoute>} />
        <Route path="/migrar-datos-maestros" element={<ProtectedRoute><MigracionPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;