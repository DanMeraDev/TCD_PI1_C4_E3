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

  return (
    <div>
      <Navbar />
      <div className="tour-info-card">
        <h1 className="tour-info-destination">{tour.destination}</h1>
        <p className="tour-info-description">{tour.description}</p>
        
        <div className="tour-info-details">
          <div className="tour-info-detail">
            <strong>Climbing Style:</strong> {tour.climbingStyle}
          </div>
          <div className="tour-info-detail">
            <strong>Level:</strong> {tour.level}
          </div>
          <div className="tour-info-detail">
            <strong>Day:</strong> {tour.day}
          </div>
          <div className="tour-info-detail">
            <strong>Schedule:</strong> {tour.schedule}
          </div>
        </div>
        
        {/* Bloque de características */}
        <div className="tour-info-features">
            <h2 className="tour-info-features-title">Características</h2>
            <ul className="tour-info-features-list">
            <li className="tour-info-feature">
                <span className="feature-icon">⛰️</span>
                <span className="feature-text">Terreno montañoso</span>
            </li>
            <li className="tour-info-feature">
                <span className="feature-icon">🎒</span>
                <span className="feature-text">Equipo incluido</span>
            </li>
            <li className="tour-info-feature">
                <span className="feature-icon">🕒</span>
                <span className="feature-text">Duración: 6 horas</span>
            </li>
            <li className="tour-info-feature">
                <span className="feature-icon">🍽️</span>
                <span className="feature-text">Almuerzo disponible</span>
            </li>
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
