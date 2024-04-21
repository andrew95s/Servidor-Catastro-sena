
import BackButton from '../../components/BackButton';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { ACCESS_TOKEN } from "../../api/constants";
import { API_URL } from '../../api/api_data'
import '../../output.css';

const ShowTramite = () => {
  const [notificacion, setNotificacion] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Obtén el parámetro id de los parámetros de la ruta

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
        setNotificacion(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Asegúrate de incluir id en la dependencia de useEffect
  console.log(notificacion)
  return (
    <div className='p-4'>
  <BackButton />
  <h1 className='text-3xl my-4'>Informacion del Tramite </h1>
  {loading ? (
    <Spinner />
  ) : notificacion.length > 0 ? (
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Territorial :</span>
        <span>{notificacion[0].territorial}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>ID Negocio :</span>
        <span>{notificacion[0].id_negocio}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Número de Solicitud : </span>
        <span>{notificacion[0].numero_solicitud}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Municipio :</span>
        <span>{notificacion[0].municipio}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Zona : </span>
        <span>{notificacion[0].zona}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Número de Radicación : </span>
        <span>{notificacion[0].numero_radicacion}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Número Predial : </span>
        <span>{notificacion[0].numero_predial}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Tipo de Trámite : </span>
        <span>{notificacion[0].tipo_tramite}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Clasificación : </span>
        <span>{notificacion[0].clasificacion}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Estado del Trámite : </span>
        <span>{notificacion[0].estado_tramite}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Estado del Proceso : </span>
        <span>{notificacion[0].estado_proceso}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Inicio del Proceso : </span>
        <span>{notificacion[0].inicio_proceso}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Fin del Proceso : </span>
        <span>{notificacion[0].fin_proceso}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Tarea : </span>
        <span>{notificacion[0].tarea}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Estado de la Tarea : </span>
        <span>{notificacion[0].estado_tarea}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Fecha de Inicio de Tarea : </span>
        <span>{notificacion[0].fecha_inicio_tarea}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Fecha de Fin de Tarea : </span>
        <span>{notificacion[0].fecha_fin_tarea}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Días Hábiles : </span>
        <span>{notificacion[0].dias_habiles}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Funcionario Radicador : </span>
        <span>{notificacion[0].funcionario_radicador}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Usuario Propietario : </span>
        <span>{notificacion[0].usuario_propietario}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Número de Resolución : </span>
        <span>{notificacion[0].numero_resolucion}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Fecha de Resolución : </span>
        <span>{notificacion[0].fecha_resolucion}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Radicación Masiva : </span>
        <span>{notificacion[0].radicacion_masivo}</span>
      </div>

      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Folio Matrícula : </span>
        <span>{notificacion[0].folio_matricula}</span>
      </div>
      
    </div>
  ) : (
    <p>No hay datos disponibles</p>
  )}
</div>
  );
};

export default ShowTramite;