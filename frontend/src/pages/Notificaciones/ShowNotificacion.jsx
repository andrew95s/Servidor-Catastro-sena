
import BackButton from '../../components/BackButton';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { ACCESS_TOKEN } from "../../api/constants";
import { API_URL } from '../../api/api_data'
import '../../output.css';

const ShowNotificacion = () => {
  const [notificacion, setNotificacion] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Obtén el parámetro id de los parámetros de la ruta

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
  <h1 className='text-3xl my-4'>Informacion de la Notificacion</h1>
  {loading ? (
    <Spinner />
  ) : notificacion.length > 0 ? (
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Numero Radicado</span>
        <span>{notificacion[0].numero_radicacion}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Ficha Predial</span>
        <span>{notificacion[0].numero_predial}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Municipio</span>
        <span>{notificacion[0].municipio}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Tipo Tramite</span>
        <span>{notificacion[0].tipo_tramite}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Estado Tarea</span>
        <span>{notificacion[0].estado_tarea}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Fecha Inicio Tarea</span>
        <span>{notificacion[0].fecha_inicio_tarea}</span>
      </div>
    </div>
  ) : (
    <p>No hay datos disponibles</p>
  )}
</div>
  );
};

export default ShowNotificacion;