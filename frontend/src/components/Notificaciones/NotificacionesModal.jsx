import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { CiCalendarDate } from "react-icons/ci";
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
    if (diaSemana !== 0 && diaSemana !== 6) { // 0: Domingo, 6: Sábado
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

const NotificacionesModal = ({ notificacion, onClose }) => {

 // Calcular los días hábiles y días calendario para cada notificación
 const diasHabilesTranscurridos = calcularDiasHabiles(notificacion.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
 const diasCalendariosTranscurridos = calcularDiasCalendarios(notificacion.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
  
 return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {notificacion.tipo_tramite}
        </h2>
        <h4 className='my-2 text-gray-500'>Radicado: {notificacion.Numero_Radicacion}</h4>
      
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>Desde:{notificacion.tarea}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <CiCalendarDate className='text-red-300 text-2xl' />
          <h2 className='my-1'>Fecha de inicio: {notificacion.fecha_inicio_tarea}</h2>
          <h2 className='my-1'>Días hábiles transcurridos: {diasHabilesTranscurridos}</h2>
          <h2 className='my-1'>Días calendarios transcurridos: {diasCalendariosTranscurridos}</h2>
        </div>
        <p className='mt-4'>Tramite de Conservacion Territorial CALDAS</p>
        <p className='mt-4'>Notificaciones</p>
        
      </div>
    </div>
  );
};

export default NotificacionesModal;


/*import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { CiCalendarDate } from "react-icons/ci";

const TramiteModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {book.tipo_tramite}
        </h2>
        <h4 className='my-2 text-gray-500'>Radicado: {book.Numero_Radicacion}</h4>
      
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>Desde:{book.tarea}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <CiCalendarDate className='text-red-300 text-2xl' />
          <h2 className='my-1'>Desde:{book.fecha_inicio_tarea}</h2>

        </div>
        <p className='mt-4'>Tramite de Conservacion Territorial CALDAS</p>
        <p className='mt-4'>Notificaciones</p>
        <p className='my-2'>
          Aqui el mensaje que quiero
          <h1>SENA 2024</h1>
          <h1></h1>
        <h1>ANDRES FELIPE OSORIO BASTIDAS</h1>
          
        </p>
      </div>
    </div>
  );
};

export default TramiteModal;

*/