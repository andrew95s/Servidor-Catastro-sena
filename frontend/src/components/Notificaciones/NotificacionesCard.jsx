import React from 'react';
import PropTypes from 'prop-types';
import NotificacionesSingleCard from '../Notificaciones/NotificacionesSingleCard';
import '../../output.css'

const NotificacionesCard = ({ notificaciones }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {notificaciones.map((item) => (
        <NotificacionesSingleCard key={item.numero_radicacion} notificacion={item} />
      ))}
    </div>
  );
};

NotificacionesCard.propTypes = {
  notificaciones: PropTypes.array.isRequired
};

export default NotificacionesCard;