import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ACCESS_TOKEN } from "../../api/constants";
import { API_URL } from '../../api/api_data'
import '../../output.css';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EditTramite = () => {
  const [notificacion, setNotificacion] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const response = await axios.get(`${API_URL}/datos-maestros/?numero_radicacion=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data); // Agrega esta línea
        setNotificacion(response.data[0]); // Solo toma el primer objeto de la respuesta
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); 

  const handleEditNotificacion = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem(ACCESS_TOKEN);
  
      // Crear una copia del objeto notificacion y formatear la fecha
      const notificacionData = {
        ...notificacion,
        fecha_inicio_tarea: notificacion.fecha_inicio_tarea
          ? formatDate(new Date(notificacion.fecha_inicio_tarea))
          : null
      };
  
      await axios.put(`${API_URL}/datos-maestros/${notificacion.numero_radicacion}/delete-update`, notificacionData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(false);
      enqueueSnackbar('Tramite Editado Correctamente', { variant: 'success' });
      navigate('/Notificaciones');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotificacion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Editar Tramite Nuevo</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        {notificacion && Object.keys(notificacion).length > 0 ? (
          <>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Territorial</label>
            <input type='text' name='territorial' value={notificacion.territorial || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>ID Negocio</label>
            <input type='text' name='id_negocio' value={notificacion.id_negocio || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Número de Solicitud</label>
            <input type='text' name='numero_solicitud' value={notificacion.numero_solicitud || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Municipio</label>
            <input type='text' name='municipio' value={notificacion.municipio || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Zona</label>
            <input type='text' name='zona' value={notificacion.zona || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Número de Radicación</label>
            <input type='text' name='numero_radicacion' value={notificacion.numero_radicacion || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Número Predial</label>
            <input type='text' name='numero_predial' value={notificacion.numero_predial || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Tipo de Trámite</label>
            <input type='text' name='tipo_tramite' value={notificacion.tipo_tramite || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Clasificación</label>
            <input type='text' name='clasificacion' value={notificacion.clasificacion || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Estado del Trámite</label>
            <input type='text' name='estado_tramite' value={notificacion.estado_tramite || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Estado del Proceso</label>
            <input type='text' name='estado_proceso' value={notificacion.estado_proceso || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Inicio del Proceso</label>
            <input type='text' name='inicio_proceso' value={notificacion.inicio_proceso || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Fin del Proceso</label>
            <input type='text' name='fin_proceso' value={notificacion.fin_proceso || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Tarea</label>
            <input type='text' name='tarea' value={notificacion.tarea || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Estado de la Tarea</label>
            <input type='text' name='estado_tarea' value={notificacion.estado_tarea || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Fecha de Inicio de Tarea</label>
            <input type='text' name='fecha_inicio_tarea' value={notificacion.fecha_inicio_tarea || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Fecha de Fin de Tarea</label>
            <input type='text' name='fecha_fin_tarea' value={notificacion.fecha_fin_tarea || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Días Hábiles</label>
            <input type='text' name='dias_habiles' value={notificacion.dias_habiles || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Funcionario Radicador</label>
            <input type='text' name='funcionario_radicador' value={notificacion.funcionario_radicador || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Usuario Propietario</label>
            <input type='text' name='usuario_propietario' value={notificacion.usuario_propietario || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Número de Resolución</label>
            <input type='text' name='numero_resolucion' value={notificacion.numero_resolucion || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Fecha de Resolución</label>
            <input type='text' name='fecha_resolucion' value={notificacion.fecha_resolucion || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Radicación Masiva</label>
            <input type='text' name='radicacion_masivo' value={notificacion.radicacion_masivo || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Folio Matrícula</label>
            <input type='text' name='folio_matricula' value={notificacion.folio_matricula || ''} onChange={handleInputChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

            <button className='p-2 bg-sky-300 m-8' onClick={handleEditNotificacion}>
              Guardar Cambios
            </button>
          </>
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div>
    </div>
  );

}

export default EditTramite

