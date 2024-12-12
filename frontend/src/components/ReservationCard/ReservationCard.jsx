import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ReservationCard.css';

const ReservationCard = ({ id, date, diet, totalCost, onRepeat, tourId, includeEquipment, includeLunch }) => {
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticación no encontrado.');
        return;
      }

      try {
        const response = await axios.get(`https://ramoja-tours.up.railway.app/api/tours/${tourId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTourDetails(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del tour:', error);
      }
    };

    if (tourId) {
      fetchTourDetails();
    }
  }, [tourId]);

  return (
    <div className="reservation-card">
      {tourDetails ? (
        <>
          <img
            className="reservation-card-image"
            src={tourDetails.imageUrlList[0]}
            alt={`Imagen del tour ${tourDetails.destination}`}
          />
          <h3 className="reservation-title">{tourDetails.destination}</h3>
          <p className="reservation-description">{tourDetails.description}</p>
        </>
      ) : (
        <h3 className="reservation-title">Cargando detalles...</h3>
      )}
      <p className="reservation-date"><strong>Fecha del tour:</strong> {new Date(date).toLocaleDateString()}</p>
      <p className="reservation-diet"><strong>Dieta:</strong> {diet}</p>
      <p className="reservation-cost"><strong>Costo total:</strong> ${totalCost}</p>
      <div className="reservation-icons">
        {includeEquipment && <span className="icon">🎒 Equipo incluido</span>}
        {includeLunch && <span className="icon">🍽️ Almuerzo incluido</span>}
      </div>
      <button className="reservation-button" onClick={() => onRepeat(id)}>
        Reservar de nuevo
      </button>
    </div>
  );
};

ReservationCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  date: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  totalCost: PropTypes.number.isRequired,
  onRepeat: PropTypes.func.isRequired,
  tourId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  includeEquipment: PropTypes.bool.isRequired,
  includeLunch: PropTypes.bool.isRequired,
};

export default ReservationCard;
