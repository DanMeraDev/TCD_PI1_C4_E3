import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TourInfo.css';
import { destinos, climbingStyles, categoria } from "../../utils/constants";


const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
const getCategoryLabel = (value) => categoria.find((c)=> c.value === value)?.label || value;
const getClimbingStyleLabel = (value) => climbingStyles.find((c) => c.value === value)?.label || value;

function TourInfo() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();


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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const mappedDay = dayMapping[tour.day] || tour.day;
  const levelWithStars = levelStars[tour.level] || '';


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
                <strong>Estilo:</strong> {getClimbingStyleLabel(tour.climbingStyle)}
              </div>}
              {tour.level && <div className="tour-info-detail">
                <strong>Nivel:</strong> {tour.level} {levelWithStars}
              </div>}
              <div className="tour-info-detail">
                <strong>Día:</strong> {mappedDay}
              </div>
              <div className="tour-info-detail">
                <strong>Horario:</strong> {tour.schedule}
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
          <button className="btn-primarySection primary" onClick={()=>navigate("/reservation")}>
            Reservar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TourInfo;
