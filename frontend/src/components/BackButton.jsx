import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retrocede una página en el historial de navegación
  };

  return (
    <div className='flex'>
      <button onClick={handleGoBack} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-2xl' />
      </button>
    </div>
  );
};

BackButton.propTypes = {
  destination: PropTypes.string
};

export default BackButton;