import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from "../../api/constants";
import NotificacionesTable from '../../components/Notificaciones/NotificacionesTable';
import NotificacionesCard from '../../components/Notificaciones/NotificacionesCard';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { API_URL } from '../../api/api_data'
import '../../output.css';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [cantidadResultados, setCantidadResultados] = useState(100); // Valor por defecto
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
  const [filtroTipoTramite, setFiltroTipoTramite] = useState('');
  const [filtroTarea, setFiltroTarea] = useState('');
  const [filtroNumeroRadicacion, setFiltroNumeroRadicacion] = useState(''); // Nuevo estado para el número de radicación

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      // Construir la URL de la consulta
      let url = `${API_URL}/datos-notificaciones/?cantidad=${cantidadResultados}&municipio=${filtroMunicipio}&tipo_tramite=${filtroTipoTramite}&tarea=${filtroTarea}`;
      // Agregar el filtro de número de radicación si se proporciona
      if (filtroNumeroRadicacion) {
        url += `&numero_radicacion=${filtroNumeroRadicacion}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtrar por días hábiles mayores a 0 y ordenar de mayor a menor
      const notificacionesFiltradas = response.data
        .filter(notif => calcularDiasHabiles(notif.fecha_inicio_tarea, new Date().toISOString().split('T')[0]) > 0)
        .sort((a, b) => {
          const diasA = calcularDiasHabiles(a.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          const diasB = calcularDiasHabiles(b.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          return diasB - diasA; // Ordenar de mayor a menor
        });

      setNotificaciones(notificacionesFiltradas);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular días hábiles
  function calcularDiasHabiles(fechaInicioStr, fechaFinStr) {
    if (!fechaInicioStr || !fechaFinStr) {
      return 0;
    }

    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);
    let diasHabiles = 0;
    let fechaActual = new Date(fechaInicio);

    while (fechaActual <= fechaFin) {
      const diaSemana = fechaActual.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) { // 0: Domingo, 6: Sábado
        diasHabiles++;
      }
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return diasHabiles;
  }

  return (
    <>
    <div className='app'>
        <Sidebar />
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Ver en Tablas
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Ver en Tarjetas
        </button>
      </div>
      <div className='flex justify-between items-center'>
      <label className="block text-gray-700">Listar Cantidad:</label>
      <select
        className="border border-gray-300 rounded-md px-2 py-1"
        value={cantidadResultados}
        onChange={(e) => setCantidadResultados(Number(e.target.value))}
      >
        
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
          <option value={5000}>5000</option>
          <option value={10000}>10000</option>
          <option value={50000}>50000</option>
          <option value={100000}>100000</option>
          <option value={1000000}>1000000</option>
          <option value={50000000}>50000000</option>
        </select>
        
        <div>
          <label>Municipio:</label>
          <select
      className="border border-gray-300 rounded-md px-2 py-1"
      value={filtroMunicipio}
      onChange={(e) => setFiltroMunicipio(e.target.value)}
    >
            <option value="">Seleccionar municipio</option>
            <option value="AGUADAS">AGUADAS</option>
            <option value="ANSERMA">ANSERMA</option>
            <option value="ARANZAZU">ARANZAZU</option>
            <option value="BELALCÁZAR">BELALCÁZAR</option>
            <option value="CHINCHINÁ">CHINCHINÁ</option>
            <option value="FILADELFIA">FILADELFIA</option>
            <option value="LA DORADA">LA DORADA</option>
            <option value="LA MERCED">LA MERCED</option>
            <option value="MANZANARES">MANZANARES</option>
            <option value="MARMATO">MARMATO</option>
            <option value="MARQUETALIA">MARQUETALIA</option>
            <option value="MARULANDA">MARULANDA</option>
            <option value="NEIRA">NEIRA</option>
            <option value="NORCASIA">NORCASIA</option>
            <option value="PALESTINA">PALESTINA</option>
            <option value="PENSILVANIA">PENSILVANIA</option>
            <option value="PÁCORA">PÁCORA</option>
            <option value="RIOSUCIO">RIOSUCIO</option>
            <option value="RISARALDA">RISARALDA</option>
            <option value="SALAMINA">SALAMINA</option>
            <option value="SAMANÁ">SAMANÁ</option>
            <option value="SAN JOSÉ">SAN JOSÉ</option>
            <option value="SUPÍA">SUPÍA</option>
            <option value="VICTORIA">VICTORIA</option>
            <option value="VILLAMARÍA">VILLAMARÍA</option>
            <option value="VITERBO">VITERBO</option>

            {/* Resto de las opciones de municipio */}
          </select>
        </div>
        <div>
          <label>Tipo de Trámite:</label>
          <select
      className="border border-gray-300 rounded-md px-2 py-1"
      value={filtroTipoTramite}
      onChange={(e) => setFiltroTipoTramite(e.target.value)}
    >
            <option value="">Seleccionar tipo de trámite</option>
            <option value="Mutación Segunda Desenglobe">Mutación Segunda Desenglobe</option>
            <option value="Mutación Primera">Mutación Primera</option>
            <option value="Cancelación de Predio">Cancelación de Predio</option>
            <option value="Rectificación">Rectificación</option>
            <option value="Mutación Segunda Englobe">Mutación Segunda Englobe</option>
            <option value="Mutación Quinta Nuevo">Mutación Quinta Nuevo</option>
            <option value="Mutación Tercera">Mutación Tercera</option>
            <option value="Complementación">Complementación</option>
            <option value="Mutación Quinta Omitido">Mutación Quinta Omitido</option>
            <option value="Revisión de Avalúo">Revisión de Avalúo</option>
            <option value="Recurso Reposición en Subsidio Apelación">Recurso Reposición en Subsidio Apelación</option>
            <option value="Mutación Segunda Coeficiente_Copropiedad">Mutación Segunda Coeficiente_Copropiedad</option>
            <option value="Recurso de Reposición">Recurso de Reposición</option>
            <option value="Recurso de Apelación">Recurso de Apelación</option>
            <option value="Modificación Inscripción Catastral">Modificación Inscripción Catastral</option>

            {/* Resto de las opciones de tipo de trámite */}
          </select>
        </div>
        <div>
          <label>Tarea:</label>
          <select
      className="border border-gray-300 rounded-md px-2 py-1"
      value={filtroTarea}
      onChange={(e) => setFiltroTarea(e.target.value)}
    >
            <option value="">Seleccionar tarea</option>
            <option value="Validación.Registrar notificación">Validación.Registrar notificación</option>
            <option value="Validación.Notificar por aviso">Validación.Notificar por aviso</option>
            <option value="Validación.Registrar aviso">Validación.Registrar aviso</option>
            <option value="Validación.Comunicar notificación de resolución">Validación.Comunicar notificación de resolución</option>
            

            
            {/* Resto de las opciones de tarea */}
          </select>
        </div>
        <div>
          <label>Número de Radicación:</label>
          <input
      type="text"
      value={filtroNumeroRadicacion}
      onChange={(e) => setFiltroNumeroRadicacion(e.target.value)}
      className="border border-gray-300 rounded-md px-2 py-1"
    />
        </div>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={fetchData}>Buscar</button>
        <Link to='/notificaciones/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <NotificacionesTable notificaciones={notificaciones} />
        ) : (
          <NotificacionesCard notificaciones={notificaciones} />
        )}
      </div>
      </div>
      </>
    );
  };
  
  export default Notificaciones;

/*  
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from "../../api/constants";
import NotificacionesTable from '../../components/Notificaciones/NotificacionesTable';
import NotificacionesCard from '../../components/Notificaciones/NotificacionesCard';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import '../../output.css';
const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [cantidadResultados, setCantidadResultados] = useState(100); // Valor por defecto
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
  const [filtroTipoTramite, setFiltroTipoTramite] = useState('');
  const [filtroTarea, setFiltroTarea] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const response = await axios.get(`http://localhost:8000/api/datos-notificaciones/?cantidad=${cantidadResultados}&municipio=${filtroMunicipio}&tipo_tramite=${filtroTipoTramite}&tarea=${filtroTarea}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtrar por días hábiles mayores a 0 y ordenar de mayor a menor
      const notificacionesFiltradas = response.data
        .filter(notif => calcularDiasHabiles(notif.fecha_inicio_tarea, new Date().toISOString().split('T')[0]) > 0)
        .sort((a, b) => {
          const diasA = calcularDiasHabiles(a.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          const diasB = calcularDiasHabiles(b.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          return diasB - diasA; // Ordenar de mayor a menor
        });

      setNotificaciones(notificacionesFiltradas);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular días hábiles
  function calcularDiasHabiles(fechaInicioStr, fechaFinStr) {
    if (!fechaInicioStr || !fechaFinStr) {
      return 0;
    }

    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);
    let diasHabiles = 0;
    let fechaActual = new Date(fechaInicio);

    while (fechaActual <= fechaFin) {
      const diaSemana = fechaActual.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) { // 0: Domingo, 6: Sábado
        diasHabiles++;
      }
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return diasHabiles;
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Ver en Tablas
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Ver en Tarjetas
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Lista de Notificaciones</h1>
        <select
          value={cantidadResultados}
          onChange={(e) => setCantidadResultados(Number(e.target.value))}
        >
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
          <option value={5000}>5000</option>
          <option value={10000}>10000</option>
          <option value={50000}>50000</option>
          <option value={100000}>100000</option>
          <option value={1000000}>1000000</option>
          <option value={50000000}>50000000</option>
        </select>
        <div>
          <label>Municipio:</label>
          <select value={filtroMunicipio} onChange={(e) => setFiltroMunicipio(e.target.value)}>
            <option value="">Seleccionar municipio</option>
            <option value="AGUADAS">AGUADAS</option>
            <option value="ANSERMA">ANSERMA</option>
            <option value="ARANZAZU">ARANZAZU</option>
            <option value="BELALCÁZAR">BELALCÁZAR</option>
            <option value="CHINCHINÁ">CHINCHINÁ</option>
            <option value="FILADELFIA">FILADELFIA</option>
            <option value="LA DORADA">LA DORADA</option>
            <option value="LA MERCED">LA MERCED</option>
            <option value="MANZANARES">MANZANARES</option>
            <option value="MARMATO">MARMATO</option>
            <option value="MARQUETALIA">MARQUETALIA</option>
            <option value="MARULANDA">MARULANDA</option>
            <option value="NEIRA">NEIRA</option>
            <option value="NORCASIA">NORCASIA</option>
            <option value="PALESTINA">PALESTINA</option>
            <option value="PENSILVANIA">PENSILVANIA</option>
            <option value="PÁCORA">PÁCORA</option>
            <option value="RIOSUCIO">RIOSUCIO</option>
            <option value="RISARALDA">RISARALDA</option>
            <option value="SALAMINA">SALAMINA</option>
            <option value="SAMANÁ">SAMANÁ</option>
            <option value="SAN JOSÉ">SAN JOSÉ</option>
            <option value="SUPÍA">SUPÍA</option>
            <option value="VICTORIA">VICTORIA</option>
            <option value="VILLAMARÍA">VILLAMARÍA</option>
            <option value="VITERBO">VITERBO</option>

            //{/* Resto de las opciones de municipio */
          /*</select>
        </div>
        <div>
          <label>Tipo de Trámite:</label>
          <select value={filtroTipoTramite} onChange={(e) => setFiltroTipoTramite(e.target.value)}>
            <option value="">Seleccionar tipo de trámite</option>
            <option value="Mutación Segunda Desenglobe">Mutación Segunda Desenglobe</option>
            <option value="Mutación Primera">Mutación Primera</option>
            <option value="Cancelación de Predio">Cancelación de Predio</option>
            <option value="Rectificación">Rectificación</option>
            <option value="Mutación Segunda Englobe">Mutación Segunda Englobe</option>
            <option value="Mutación Quinta Nuevo">Mutación Quinta Nuevo</option>
            <option value="Mutación Tercera">Mutación Tercera</option>
            <option value="Complementación">Complementación</option>
            <option value="Mutación Quinta Omitido">Mutación Quinta Omitido</option>
            <option value="Revisión de Avalúo">Revisión de Avalúo</option>
            <option value="Recurso Reposición en Subsidio Apelación">Recurso Reposición en Subsidio Apelación</option>
            <option value="Mutación Segunda Coeficiente_Copropiedad">Mutación Segunda Coeficiente_Copropiedad</option>
            <option value="Recurso de Reposición">Recurso de Reposición</option>
            <option value="Recurso de Apelación">Recurso de Apelación</option>
            <option value="Modificación Inscripción Catastral">Modificación Inscripción Catastral</option>

            {/* Resto de las opciones de tipo de trámite 
          </select>
        </div>
        <div>
          <label>Tarea:</label>
          <select value={filtroTarea} onChange={(e) => setFiltroTarea(e.target.value)}>
            <option value="">Seleccionar tarea</option>
            <option value="Validación.Notificar por aviso">Validación.Notificar por aviso</option>
            <option value="Validación.Registrar aviso">Validación.Registrar aviso</option>
            {/* Resto de las opciones de tarea 
          </select>
        </div>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={fetchData}>Buscar</button>
        <Link to='/notificaciones/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <NotificacionesTable notificaciones={notificaciones} />
        ) : (
          <NotificacionesCard notificaciones={notificaciones} />
        )}
      </div>
    );
  };
  
  export default Notificaciones;

*/