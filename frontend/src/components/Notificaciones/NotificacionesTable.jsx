import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import '../../output.css';

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

// Función para calcular el color de la fila según los días hábiles transcurridos
function calcularColorFila(diasHabiles) {
  if (diasHabiles >= 0 && diasHabiles <= 3) {
    return 'bg-blue-200'; // Azul
  } else if (diasHabiles > 3 && diasHabiles <= 6) {
    return 'bg-green-200'; // Verde
  } else if (diasHabiles > 6 && diasHabiles <= 10) {
    return 'bg-yellow-200'; // Naranja
  } else {
    return 'bg-red-200'; // Rojo
  }
}

const NotificacionesTable = ({ notificaciones }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>#</th>
          <th className='border border-slate-600 rounded-md'>Municipio</th>
          <th className='border border-slate-600 rounded-md'>Numero Radicacion</th>
          <th className='border border-slate-600 rounded-md'>Numero Predial</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>Tipo Tramite</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>Tarea</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>Fecha Inicio</th>
          <th className='border border-slate-600 rounded-md'>Dias Habiles</th>
          <th className='border border-slate-600 rounded-md'>Dias Calendario</th>
        </tr>
      </thead>
      <tbody>
        {notificaciones.map((notificacion, index) => {
          // Calcular los días hábiles y días calendario para cada notificación
          const diasHabilesTranscurridos = calcularDiasHabiles(notificacion.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          const diasCalendariosTranscurridos = calcularDiasCalendarios(notificacion.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          const colorFila = calcularColorFila(diasHabilesTranscurridos);

          return (
            <tr key={notificacion.numero_radicacion} className={`h-8 ${colorFila}`}>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center'>{notificacion.municipio}</td>
              <td className='border border-slate-700 rounded-md text-center'>{notificacion.numero_radicacion}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{notificacion.numero_predial}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{notificacion.tipo_tramite}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{notificacion.tarea}</td>
              <td className='border border-slate-700 rounded-md text-center'>{notificacion.fecha_inicio_tarea}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{diasHabilesTranscurridos}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{diasCalendariosTranscurridos}</td>
              
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/notificaciones/details/${notificacion.numero_radicacion}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/notificaciones/edit/${notificacion.numero_radicacion}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/notificaciones/delete/${notificacion.numero_radicacion}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

NotificacionesTable.propTypes = {
  notificaciones: PropTypes.array.isRequired,
};

export default NotificacionesTable;


/*import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
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

const NotificacionesTable = ({ notificaciones }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>#</th>
          <th className='border border-slate-600 rounded-md'>Municipio</th>
          <th className='border border-slate-600 rounded-md'>Numero Radicacion</th>
          <th className='border border-slate-600 rounded-md'>Numero Predial</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>Tipo Tramite</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>Tarea</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>Fecha Inicio</th>
          <th className='border border-slate-600 rounded-md'>Dias Habiles</th>
          <th className='border border-slate-600 rounded-md'>Dias Calendario</th>
        </tr>
      </thead>
      <tbody>
        {notificaciones.map((notificacion, index) => {
          // Calcular los días hábiles y días calendario para cada notificación
          const diasHabilesTranscurridos = calcularDiasHabiles(notificacion.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);
          const diasCalendariosTranscurridos = calcularDiasCalendarios(notificacion.fecha_inicio_tarea, new Date().toISOString().split('T')[0]);

          return (
            <tr key={notificacion.numero_radicacion} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center'>{notificacion.municipio}</td>
              <td className='border border-slate-700 rounded-md text-center'>{notificacion.numero_radicacion}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{notificacion.numero_predial}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{notificacion.tipo_tramite}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{notificacion.tarea}</td>
              <td className='border border-slate-700 rounded-md text-center'>{notificacion.fecha_inicio_tarea}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{diasHabilesTranscurridos}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{diasCalendariosTranscurridos}</td>
              
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/notificaciones/details/${notificacion.numero_radicacion}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/notificaciones/edit/${notificacion.numero_radicacion}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/notificaciones/delete/${notificacion.numero_radicacion}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

NotificacionesTable.propTypes = {
  notificaciones: PropTypes.array.isRequired,
};

export default NotificacionesTable;
*/