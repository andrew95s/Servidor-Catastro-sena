import React from 'react';
import PropTypes from 'prop-types';
import TramitesSingleCard from './TramitesSingleCard';
import '../../output.css'

const TramitesCard = ({ notificaciones }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {notificaciones.map((item) => (
        <TramitesSingleCard key={item.numero_radicacion} notificacion={item} />
      ))}
    </div>
  );
};

TramitesCard.propTypes = {
  notificaciones: PropTypes.array.isRequired
};

export default TramitesCard;