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

  const toursApi = [
    {
      id: 5,
      destination: "LA_MOJARRA",
      description: "Slack Line en la Mojarra",
      categoryId: 3,
      climbingStyle: "FERRATA",
      level: "INTERMEDIATE",
      day: "THU",
      schedule: "15:00",
      imageUrlList: [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229875/tours/tours/null-1732229874697-slack-line.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229876/tours/tours/null-1732229875695-hcarne.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229877/tours/tours/null-1732229877026-mojarra2.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229878/tours/tours/null-1732229878198-chicamocha.jpeg.jpg",
      ],
      imageFileList: null,
    },
    {
      id: 2,
      destination: "LA_MOJARRA",
      description:
        "Tour de escalada deportiva en La Mojarra para escaladores de nivel intermedio, incluye almuerzo, alquiler de equipo, acompañamiento de un guía certificado y el valor de ingreso al parque. ",
      categoryId: 1,
      climbingStyle: "SPORT",
      level: "INTERMEDIATE",
      day: "MON",
      schedule: "14:00",
      imageUrlList: [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227803/tours/tours/null-1732227795666-mojarra2.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227804/tours/tours/null-1732227804070-mojarra1.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227806/tours/tours/null-1732227805160-climbing-gear.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227807/tours/tours/null-1732227806690-hcarne.jpg.jpg",
      ],
      imageFileList: null,
    },
    {
      id: 6,
      destination: "CHICAMOCHA",
      description:
        "Visita al cañón del Chicamocha en teleférico. Incluye alimentación y entrada al parque.",
      categoryId: 4,
      climbingStyle: null,
      level: null,
      day: "FRI",
      schedule: "08:00",
      imageUrlList: [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732322612/tours/tours/CHICAMOCHA-1732322611348-chicamocha.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732322614/tours/tours/CHICAMOCHA-1732322613800-shawarma.jpeg.jpg",
      ],
      imageFileList: null,
    },
  ];

  // useEffect(() => {

  //   const fetchTours = async () => {
  //     try {
  //       const data = await getAllTours();
  //       setTours(data);
  //       setError("Error al cargar los tours...");
  //       setRandomTours(getRandomElements(data, 3));
  //     } catch (error) {
  //       setError("Error al cargar los tours...");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTours();
  // }, []);

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
        {/* {loading && <p className="loading-text">Cargando tours...</p>}

        {!loading && error && <p className="error-text">{error}</p>}

        {!loading && !error && randomTours.length === 0 && (
          <p className="empty-text">No hay tours disponibles en este momento.</p>
        )} */}

        {/* {!loading && !error && randomTours.length > 0 && */}
        {toursApi.map((tour) => (
          <RecommendationDetailCard
            key={tour.id}
            nameTour={tour.destination}
            description={tour.description}
            urlSrc={tour.imageUrlList?.[0]}
            onClick={handleClick}
          />
        ))}
        {/* } */}
      </div>
    </div>
  );
};

export default RecommendationsSection;
