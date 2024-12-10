import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TourInfo.css';
import { destinos, climbingStyles, categoria } from "../../utils/constants";
import Modal from 'react-modal';
import AvailabilityCalendar from '../Calendar/AvailabilityCalendar';

const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
const getCategoryLabel = (value) => categoria.find((c) => c.value === value)?.label || value;
const getClimbingStyleLabel = (value) => climbingStyles.find((c) => c.value === value)?.label || value;

function TourInfo() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [occupiedDates, setOccupiedDates] = useState([]);
  const navigate = useNavigate();

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '350px',
      width: '50%',
    }
  };

  const dayMapping = {
    MON: 'Lunes',
    TUE: 'Martes',
    WED: 'Miércoles',
    THU: 'Jueves',
    FRI: 'Viernes',
    SAT: 'Sábado',
    SUN: 'Domingo',
  };

  const levelStars = {
    NOVICE: '🌱',
    BEGINNER: '⭐',
    INTERMEDIATE: '⭐⭐',
    ADVANCED: '⭐⭐⭐⭐',
    EXPERT: '⭐⭐⭐⭐⭐',
    SUPER_EXPERT: '⭐⭐⭐⭐⭐',
    ELITE: '🤖',
    SUPER_ELITE: '👾',
    ALIENS: '👽',
  };


  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`https://ramoja-tours.up.railway.app/api/tours/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }
        const data = await response.json();
        setTour(data);
        setCurrentImage(data.imageUrlList[0]); // set default image as the first image.
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const fetchOccupiedDates = async () => {
    try {
      const response = await fetch(`https://ramoja-tours.up.railway.app/api/reservations/tours/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch occupied dates');
      }
      const data = await response.json();
      const dates = data.map(reservation => reservation.date); // Extract dates
      setOccupiedDates(dates);
    } catch (err) {
      console.error('Error fetching occupied dates:', err);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const mappedDay = dayMapping[tour.day] || tour.day;
  const levelWithStars = levelStars[tour.level] || '';

  const openModal = async () => {
    await fetchOccupiedDates(); // Fetch occupied dates before opening the modal
    setIsModalOpen(true);
  }
  
  const closeModal = () => setIsModalOpen(false);

  // Datos quemados para las descripciones
  const featureDescriptions = {
    "Terreno montañoso": "El terreno es rocoso y desafiante, ideal para los amantes de la escalada de alta dificultad.",
    "Equipo incluido": "Incluye casco, arnés, cuerdas y todo el equipo necesario para la actividad.",
    "Duración: 6 horas": "El tour tiene una duración total de 6 horas, que incluye las actividades y descansos.",
    "Almuerzo disponible": "El almuerzo consistirá en una comida energética: sándwiches, frutas, y bebidas."
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div>
      <Navbar />

      <div className="tour-info-card">
        <div className="info-upper">
          <div className="tour-image-container">
            {/* Left section with the main image */}
            <div className="main-image-container">
              <img
                src={currentImage}
                alt="Tour Main"
                className="main-image"
              />
            </div>
            {/* Carousel below the main image */}
            <div className="image-carousel">
              {tour.imageUrlList.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${currentImage === image ? "active" : ""}`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>

          </div>


          <div className="tour-info-container">
            <h2 className="tour-info-destination">{getCategoryLabel(tour.categoryId)} en {getDestinationLabel(tour.destination)}</h2>
            <p className="tour-info-description">{tour.description}</p>

            <div className="tour-info-details">

              {tour.categoryId && <div className="tour-info-detail">
                <span><strong>Estilo:</strong> {getClimbingStyleLabel(tour.climbingStyle)}</span> 
              </div>}
              {tour.level && <div className="tour-info-detail">
                <span><strong>Nivel:</strong> {tour.level} {levelWithStars}</span> 
              </div>}
              <div className="tour-info-detail">
                <span><strong>Día:</strong> {mappedDay}</span> 
                <div className="calendar" onClick={openModal}>
                  <span > 📅Ver fechas</span>
                </div>
              </div>
              <div className="tour-info-detail">
                <span><strong>Horario:</strong> {tour.schedule}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="info-lower">
          <div className="tour-info-features">
            <h2 className="tour-info-features-title">Características</h2>
            <ul className="tour-info-features-list">
              {Object.keys(featureDescriptions).map((feature, index) => (
                <li key={index} className="tour-info-feature">
                  <span className="feature-icon">{feature === "Terreno montañoso" ? "⛰️" : feature === "Equipo incluido" ? "🎒" : feature === "Duración: 6 horas" ? "🕒" : "🍽️"}</span>
                  <span className="feature-text">{feature}</span>
                  <div className="tooltip">
                    {featureDescriptions[feature]}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn-primarySection primary" onClick={() => navigate(`/reservation/tour/${id}`)}>
            Reservar
          </button>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Availability Calendar"
        ariaHideApp={false}
      >
        <AvailabilityCalendar
          day={tour.day}
          title="Seleccione una fecha"
          availableDates={tour.availableDates || []}
          occupiedDates={occupiedDates}
          onDateSelected={(date) => {
            console.log("Selected Date:", date);
            closeModal();
          }}
        />
        <p onClick={closeModal} className="modal-close-button">Cerrar</p>
      </Modal>
    </div>
  );
}

export default TourInfo;
