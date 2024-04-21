import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ACCESS_TOKEN } from "../../api/constants";
import { API_URL } from '../../api/api_data'
import '../../output.css';

const DeleteTramite = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Cambiado de 'pk' a 'id'
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTramite = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem(ACCESS_TOKEN);
      await axios.delete(`${API_URL}/datos-maestros/${id}/delete-update`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(false);
      enqueueSnackbar('El tramite Fue Borrado con Exito', { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Borrar Tramite</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>¿Esta seguro de Borrar este Tramite?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteTramite}>
          Si, Borrar Tramite
        </button>
      </div>
    </div>
  )
}

export default DeleteTramite;