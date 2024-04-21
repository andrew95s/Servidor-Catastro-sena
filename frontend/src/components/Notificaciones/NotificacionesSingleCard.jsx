import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { FaCity } from 'react-icons/fa';
import { FcTodoList } from "react-icons/fc";
import { FcAnswers } from "react-icons/fc";
import { SiRadstudio } from 'react-icons/si';
import { GiMeshNetwork } from 'react-icons/gi';
import { IoIosPaper } from 'react-icons/io';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { FcHome } from "react-icons/fc";
import { FcFinePrint } from "react-icons/fc";
import { FcDataSheet } from "react-icons/fc";
import NotificacionesModal from './NotificacionesModal';
import '../../output.css'
// Función para calcular los días hábiles entre dos fechas
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
    if (diaSemana !== 0 && diaSemana !== 6) {
      diasHabiles++;
    }
    fechaActual.setDate(fechaActual.getDate() + 1);
  }
  return diasHabiles;
}

// Función para calcular los días calendario entre dos fechas
function calcularDiasCalendarios(fechaInicioStr, fechaFinStr) {
  if (!fechaInicioStr || !fechaFinStr) {
    return 0;
  }

  const fechaInicio = new Date(fechaInicioStr);
  const fechaFin = new Date(fechaFinStr);
  const diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
  const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  return diferenciaEnDias;
}

// Función para determinar la imagen a mostrar según los días hábiles transcurridos
function determinarImagenDiasHabiles(diasHabilesTranscurridos) {
  if (diasHabilesTranscurridos >= 0 && diasHabilesTranscurridos <= 3) {
    return '1-RR.gif';
  } else if (diasHabilesTranscurridos > 3 && diasHabilesTranscurridos <= 6) {
    return '2-RR.gif';
  } else if (diasHabilesTranscurridos > 6 && diasHabilesTranscurridos <= 10) {
    return '33-R.gif';
  } else {
    return '4-RR.gif';
  }
}
function determinarColorDiasHabiles(diasHabilesTranscurridos) {
  if (diasHabilesTranscurridos >= 0 && diasHabilesTranscurridos <= 5) {
    return 'radial-gradient(circle, rgba(0, 255, 0, 0.5), rgba(0, 255, 0, 0))'; // Verde
  } else if (diasHabilesTranscurridos > 5 && diasHabilesTranscurridos <= 7) {
    return 'radial-gradient(circle, rgba(255, 255, 0, 0.5), rgba(255, 255, 0, 0))'; // Amarillo
  } else if (diasHabilesTranscurridos > 7 && diasHabilesTranscurridos <= 10) {
    return 'radial-gradient(circle, rgba(255, 165, 0, 0.5), rgba(255, 165, 0, 0))'; // Naranja
  } else {
    return 'radial-gradient(circle, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))'; // Rojo
  }
}


const NotificacionesSingleCard = ({ notificacion }) => {
  const [showModal, setShowModal] = React.useState(false);

  // Verificar si notificacion es undefined
  if (!notificacion) {
    return <div>No se encontró la notificación</div>;
  }

  // Utilizar valores por defecto en caso de que fecha_inicio_tarea sea undefined
  const fechaInicioTarea = notificacion.fecha_inicio_tarea || '';
  const diasHabilesTranscurridos = calcularDiasHabiles(fechaInicioTarea, new Date().toISOString().split('T')[0]);
  const diasCalendariosTranscurridos = calcularDiasCalendarios(fechaInicioTarea, new Date().toISOString().split('T')[0]);

  const imagenDiasHabiles = determinarImagenDiasHabiles(diasHabilesTranscurridos);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        Dias Habiles: {diasHabilesTranscurridos}
      </h2>
      
      <h2 className='my-2' >Rad: {notificacion.numero_radicacion}</h2>
      
      <div className='flex justify-start items-center gap-x-2'>
        <FcHome className='text-red-300 text-2xl' />
        <h2 className='my-1'>Ficha: {notificacion.numero_predial}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FcAnswers className='text-red-300 text-2xl' />
        <h2 className='my-1'>Tipo: {notificacion.tipo_tramite}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>Tarea: {notificacion.tarea}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FcTodoList className='text-red-300 text-2xl' />
        <h2 className='my-1'>Estado Tarea: {notificacion.estado_tarea}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FaCity className='text-red-300 text-2xl' />
        <h2 className='my-1'>Municipio: {notificacion.municipio}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FcFinePrint className='text-red-300 text-2xl' />
        <h2 className='my-1'>Num Resolucion: {notificacion.numero_resolucion}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FcDataSheet className='text-red-300 text-2xl' />
        <h2 className='my-1'>Desde: {fechaInicioTarea}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoIosPaper className='text-red-300 text-2xl' />
        <h2 className='my-1'>Dias Habiles: {diasHabilesTranscurridos}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoIosPaper className='text-red-300 text-2xl' />
        <h2 className='my-1'>Dias Calendario: {diasCalendariosTranscurridos}</h2>
      </div>

      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
      <div className="image-container" style={{ background: determinarColorDiasHabiles(diasHabilesTranscurridos) }}>
    <img src={`src/assets/animated/${imagenDiasHabiles}`} alt="Imagen de estado" />
         </div>
        </div>

      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BsCalendar2DateFill
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/notificaciones/details/${notificacion.numero_radicacion}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/notificaciones/edit/${notificacion.numero_radicacion}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/notificaciones/delete/${notificacion.numero_radicacion}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <NotificacionesModal notificacion={notificacion} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

NotificacionesSingleCard.propTypes = {
  notificacion: PropTypes.object.isRequired,
};

export default NotificacionesSingleCard;


