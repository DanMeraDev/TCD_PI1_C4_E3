import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TourInfo.css';

function TourInfo() {
  const { id } = useParams(); 
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    NOVICE: '⭐',
    BEGINNER: '⭐',
    INTERMEDIATE: '⭐⭐',
    ADVANCED: '⭐⭐',
    EXPERT: '⭐⭐⭐',
    SUPER_EXPERT: '⭐⭐⭐',
    ELITE: '⭐⭐⭐⭐',
    SUPER_ELITE: '⭐⭐⭐⭐',
    ALIENS: '⭐⭐⭐⭐⭐',
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

  return (
    <div>
      <Navbar />
      <div className="tour-info-card">
        <h1 className="tour-info-destination">{tour.destination}</h1>
        <p className="tour-info-description">{tour.description}</p>
        
        <div className="tour-info-details">
          <div className="tour-info-detail">
            <strong>Estilo de Escalada:</strong> {tour.climbingStyle}
          </div>
          <div className="tour-info-detail">
            <strong>Nivel:</strong> {tour.level} {levelWithStars}
          </div>
          <div className="tour-info-detail">
            <strong>Día:</strong> {mappedDay}
          </div>
          <div className="tour-info-detail">
            <strong>Horario:</strong> {tour.schedule}
          </div>
        </div>
        
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
        
        <div className="tour-info-images">
          {tour.imageUrlList.map((url, index) => (
            <img key={index} src={url} alt={`Tour image ${index + 1}`} className="tour-info-image" />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TourInfo;
