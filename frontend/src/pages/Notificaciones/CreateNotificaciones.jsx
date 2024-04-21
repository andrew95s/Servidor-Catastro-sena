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

const CreateNotificaciones = () => {
  const [numero_solicitud, setnumero_solicitud] = useState('');
  const [municipio, setmunicipio] = useState('');
  const [numero_radicacion, setnumero_radicacion] = useState('');
  const [numero_predial, setnumero_predial] = useState('');
  const [tipo_tramite, settipo_tramite] = useState('');
  const [tarea, settarea] = useState('');
  const [estado_tarea, setestado_tarea] = useState('');
  const [fecha_inicio_tarea, setfecha_inicio_tarea] = useState('');
  const [usuario_propietario, setusuario_propietario] = useState('');
  const [numero_resolucion, setnumero_resolucion] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveNotificacion = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const data = {
      numero_solicitud,
      municipio,
      numero_radicacion,
      numero_predial,
      tipo_tramite,
      tarea,
      estado_tarea,
      fecha_inicio_tarea: fecha_inicio_tarea?.toISOString().split('T')[0], // Formatear la fecha
      usuario_propietario,
      numero_resolucion
    };
  
    setLoading(true);
  
    try {
      await axios.post(`${API_URL}/datos-notificaciones/`, data, {
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
          <label className='text-xl mr-4 text-gray-500'>Numero Solicitud</label>
          <input
            type='text'
            value={numero_solicitud}
            onChange={(e) => setnumero_solicitud(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Municipio</label>
          <input
            type='text'
            value={municipio}
            onChange={(e) => setmunicipio(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Numero Radicacion</label>
          <input
            type='text'
            value={numero_radicacion}
            onChange={(e) => setnumero_radicacion(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Ficha Predial</label>
          <input
            type='text'
            value={numero_predial}
            onChange={(e) => setnumero_predial(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Tipo Tramite</label>
          <input
            type='text'
            value={tipo_tramite}
            onChange={(e) => settipo_tramite(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Tarea</label>
          <input
            type='text'
            value={tarea}
            onChange={(e) => settarea(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Estado Tarea</label>
          <input
            type='text'
            value={estado_tarea}
            onChange={(e) => setestado_tarea(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Fecha Inicio Tarea</label>
          <DatePicker
            selected={fecha_inicio_tarea} // Utiliza la variable de estado para la fecha seleccionada
            onChange={(date) => setfecha_inicio_tarea(date)} // Actualiza la variable de estado cuando se selecciona una fecha
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Usuario Propietario</label>
          <input
            type='text'
            value={usuario_propietario}
            onChange={(e) => setusuario_propietario(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Numero Resolucion</label>
          <input
            type='text'
            value={numero_resolucion}
            onChange={(e) => setnumero_resolucion(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveNotificacion}>
          Registrar Notificacion
        </button>
      </div>
    </div>
  );
}

export default CreateNotificaciones