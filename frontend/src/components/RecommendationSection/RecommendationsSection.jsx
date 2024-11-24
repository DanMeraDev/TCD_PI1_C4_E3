import "./recommendationSection.css";
import RecommendationDetailCard from "../RecommendationDetailCard/RecommendationDetailCard";
import { useNavigate } from "react-router-dom";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";
import { useEffect, useState } from "react";
import { getAllTours } from "../../utils/axios/getAllTours";
import getRandomElements from "../../utils/functions/getRandomElements";

const RecommendationsSection = () => {
  const [tours, setTours] = useState([]);
  const [randomTours, setRandomTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAllTours();
        setTours(data);
        setRandomTours(getRandomElements(data, 3));
        // console.log(data);
      } catch (error) {
        setError("Error al cargar los tours...");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // console.log(randomTours);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/tours");
    window.scrollTo(0, 0); // volver a la parte de arriba de la página.
  };

  return (
    <div className="recommendations-container">
      <div className="title-container">
        <div className="description-container">
          <h2 className="title">Tours Recomendados</h2>
          <p className="description-tours">
            Esta temporada, ya sea que regreses a casa o busques nuevos
            horizontes, nuestros tours de aventura recomendados te llevarán a
            destinos únicos para vivir experiencias emocionantes y llenas de
            adrenalina.
          </p>
        </div>
        <BtnPrimary onClick={handleClick} className="btn-primarySection">
          Ver Tours
        </BtnPrimary>
      </div>

      <div className="recommendations-wrapper">
        {loading && <p className="loading-text">Cargando tours...</p>}

        {!loading && error && <p className="error-text">{error}</p>}

        {!loading && !error && randomTours.length === 0 && (
          <p className="empty-text">
            No hay tours disponibles en este momento.
          </p>
        )}

        {!loading &&
          !error &&
          randomTours.length > 0 &&
          randomTours.map((tour) => (
            <RecommendationDetailCard
              key={tour.id}
              nameTour={tour.destination}
              description={tour.description}
              urlSrc={tour.imageUrlList?.[0]}
              onClick={handleClick}
            />
          ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
