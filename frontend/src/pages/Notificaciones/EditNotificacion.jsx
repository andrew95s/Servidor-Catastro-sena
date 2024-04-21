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

const EditBook = () => {
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
        const response = await axios.get(`${API_URL}/datos-notificaciones/?numero_radicacion=${id}`, {
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
  
      await axios.put(`${API_URL}/datos-notificaciones/${notificacion.numero_radicacion}/delete-update`, notificacionData, {
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
      <h1 className='text-3xl my-4'>Editar Notificacion Nueva</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        {notificacion && Object.keys(notificacion).length > 0 ? (
          <>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Numero Solicitud</label>
              <input
                type='text'
                name='numero_solicitud'
                value={notificacion.numero_solicitud || ''}
                onChange={handleInputChange}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Municipio</label>
              <input
                type='text'
                name='municipio'
                value={notificacion.municipio || ''}
                onChange={handleInputChange}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Numero Radicacion</label>
            <input
              type='text'
              name='numero_radicacion'
              value={notificacion.numero_radicacion || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Ficha Predial</label>
            <input
              type='text'
              name='numero_predial'
              value={notificacion.numero_predial || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Tipo Tramite</label>
            <input
              type='text'
              name='tipo_tramite'
              value={notificacion.tipo_tramite || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Tarea</label>
            <input
              type='text'
              name='tarea'
              value={notificacion.tarea || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Estado Tarea</label>
            <input
              type='text'
              name='estado_tarea'
              value={notificacion.estado_tarea || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Fecha Inicio Tarea</label>
            <input
              type='text'
              name='fecha_inicio_tarea'
              value={notificacion.fecha_inicio_tarea || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Usuario Propietario</label>
            <input
              type='text'
              name='usuario_propietario'
              value={notificacion.usuario_propietario || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Numero Resolucion</label>
            <input
              type='text'
              name='numero_resolucion'
              value={notificacion.numero_resolucion || ''}
              onChange={handleInputChange}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
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

export default EditBook

