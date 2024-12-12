import React, { useEffect, useState } from 'react';
import ReservationCard from '../ReservationCard/ReservationCard';
import './ReservationSection.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const ReservationSection = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('recent'); // Orden predeterminado: reciente
  const userId = sessionStorage.getItem('sub');

  useEffect(() => {
    if (!userId) {
      alert('Debes iniciar sesión para ver tus reservas.');
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await fetch(`https://ramoja-tours.up.railway.app/api/reservations/user/${userId}`);
        if (!response.ok) throw new Error('Error al obtener las reservas.');

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const sortedReservations = [...reservations].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
  });

  const handleRepeatReservation = (id) => {
    navigate(`/reservation/tour/${id}`);
  };

  if (loading) return <p>Cargando reservas...</p>;

  if (reservations.length === 0) return <p>No tienes reservas aún.</p>;

  return (
    <>
      <Navbar />
      <h1 className='history-title'>Historial de Reservas hechas</h1>
      <div className="sort-controls">
        <label>
          Ordenar Por:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguas</option>
          </select>
        </label>
      </div>
      <div className="reservation-section">
        {sortedReservations.map(({ id, date, tourId, diet, totalCost, includeEquipment, includeLunch }) => (
          <ReservationCard
            key={id}
            id={id}
            date={date}
            diet={diet}
            totalCost={totalCost}
            tourId={tourId}
            onRepeat={handleRepeatReservation}
            includeEquipment={includeEquipment}
            includeLunch={includeLunch}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};
export default ReservationSection;
