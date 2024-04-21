import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DatePicker from 'react-datepicker';
import { ACCESS_TOKEN } from "../../api/constants";
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de react-datepicker
import { API_URL } from '../../api/api_data'
import '../../output.css';

const CreateTramite = () => {
  const [territorial, setTerritorial] = useState('');
  const [id_negocio, setIdNegocio] = useState('');
  const [numero_solicitud, setNumeroSolicitud] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [zona, setZona] = useState('');
  const [numero_radicacion, setNumeroRadicacion] = useState('');
  const [numero_predial, setNumeroPredial] = useState('');
  const [tipo_tramite, setTipoTramite] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [estado_tramite, setEstadoTramite] = useState('');
  const [estado_proceso, setEstadoProceso] = useState('');
  const [inicio_proceso, setInicioProceso] = useState('');
  const [fin_proceso, setFinProceso] = useState('');
  const [tarea, setTarea] = useState('');
  const [estado_tarea, setEstadoTarea] = useState('');
  const [fecha_inicio_tarea, setFechaInicioTarea] = useState('');
  const [fecha_fin_tarea, setFechaFinTarea] = useState('');
  const [dias_habiles, setDiasHabiles] = useState('');
  const [funcionario_radicador, setFuncionarioRadicador] = useState('');
  const [usuario_propietario, setUsuarioPropietario] = useState('');
  const [numero_resolucion, setNumeroResolucion] = useState('');
  const [fecha_resolucion, setFechaResolucion] = useState('');
  const [radicacion_masivo, setRadicacionMasivo] = useState('');
  const [folio_matricula, setFolioMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveNotificacion = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const data = {
      territorial,
      id_negocio,
      numero_solicitud,
      municipio,
      zona,
      numero_radicacion,
      numero_predial,
      tipo_tramite,
      clasificacion,
      estado_tramite,
      estado_proceso,
      inicio_proceso,
      fin_proceso,
      tarea,
      estado_tarea,
      fecha_inicio_tarea,
      fecha_fin_tarea,
      dias_habiles,
      funcionario_radicador,
      usuario_propietario,
      numero_resolucion,
      fecha_resolucion,
      radicacion_masivo,
      folio_matricula
    };
  
    setLoading(true);
  
    try {
      await axios.post(`${API_URL}/datos-maestros/`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(false);
      enqueueSnackbar('Notificacion Creada con Exito', { variant: 'success' });
      navigate('/Notificaciones');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Crear Notificacion Nueva</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Territorial</label>
          <input type='text' value={territorial} onChange={(e) => setTerritorial(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>ID Negocio</label>
          <input type='text' value={id_negocio} onChange={(e) => setIdNegocio(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Número de Solicitud</label>
          <input type='text' value={numero_solicitud} onChange={(e) => setNumeroSolicitud(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Municipio</label>
          <input type='text' value={municipio} onChange={(e) => setMunicipio(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Zona</label>
          <input type='text' value={zona} onChange={(e) => setZona(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Número de Radicación</label>
          <input type='text' value={numero_radicacion} onChange={(e) => setNumeroRadicacion(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Número Predial</label>
          <input type='text' value={numero_predial} onChange={(e) => setNumeroPredial(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Tipo de Trámite</label>
          <input type='text' value={tipo_tramite} onChange={(e) => setTipoTramite(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Clasificación</label>
          <input type='text' value={clasificacion} onChange={(e) => setClasificacion(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Estado del Trámite</label>
          <input type='text' value={estado_tramite} onChange={(e) => setEstadoTramite(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Estado del Proceso</label>
          <input type='text' value={estado_proceso} onChange={(e) => setEstadoProceso(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Inicio del Proceso</label>
          <input type='text' value={inicio_proceso} onChange={(e) => setInicioProceso(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fin del Proceso</label>
          <input type='text' value={fin_proceso} onChange={(e) => setFinProceso(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Tarea</label>
          <input type='text' value={tarea} onChange={(e) => setTarea(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Estado de la Tarea</label>
          <input type='text' value={estado_tarea} onChange={(e) => setEstadoTarea(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fecha de Inicio de Tarea</label>
          <input type='text' value={fecha_inicio_tarea} onChange={(e) => setFechaInicioTarea(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fecha de Fin de Tarea</label>
          <input type='text' value={fecha_fin_tarea} onChange={(e) => setFechaFinTarea(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Días Hábiles</label>
          <input type='text' value={dias_habiles} onChange={(e) => setDiasHabiles(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Funcionario Radicador</label>
          <input type='text' value={funcionario_radicador} onChange={(e) => setFuncionarioRadicador(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Usuario Propietario</label>
          <input type='text' value={usuario_propietario} onChange={(e) => setUsuarioPropietario(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Número de Resolución</label>
          <input type='text' value={numero_resolucion} onChange={(e) => setNumeroResolucion(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fecha de Resolución</label>
          <input type='text' value={fecha_resolucion} onChange={(e) => setFechaResolucion(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Radicación Masiva</label>
          <input type='text' value={radicacion_masivo} onChange={(e) => setRadicacionMasivo(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Folio Matrícula</label>
          <input type='text' value={folio_matricula} onChange={(e) => setFolioMatricula(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveNotificacion}>
          Registrar Notificacion
        </button>
      </div>
    </div>
  );
}

export default CreateTramite