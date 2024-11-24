import { useEffect, useState } from "react";
import mockTours from "../../utils/functions/mockTours";
import randomData from "../../utils/functions/randomData";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./Tours.css";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BtnPrimary from "../../components/Buttons/BtnPrimary/BtnPrimary";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState(6);

  const toursApi = [
    {
      "id": 4,
      "destination": "MACAGUATO",
      "description": "Escalada Deportiva en Macaguato",
      "categoryId": 1,
      "climbingStyle": "SPORT",
      "level": "ADVANCED",
      "day": "WED",
      "schedule": "10:00",
      "imageUrlList": [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229005/tours/tours/null-1732229004307-climbing-gear.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229007/tours/tours/null-1732229005946-macaguato.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229008/tours/tours/null-1732229007850-hpollo.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229009/tours/tours/null-1732229009057-ferrata.jpeg.jpg"
      ],
      "imageFileList": null
    },
    {
      "id": 5,
      "destination": "LA_MOJARRA",
      "description": "Slack Line en la Mojarra",
      "categoryId": 3,
      "climbingStyle": "FERRATA",
      "level": "INTERMEDIATE",
      "day": "THU",
      "schedule": "15:00",
      "imageUrlList": [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229875/tours/tours/null-1732229874697-slack-line.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229876/tours/tours/null-1732229875695-hcarne.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229877/tours/tours/null-1732229877026-mojarra2.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732229878/tours/tours/null-1732229878198-chicamocha.jpeg.jpg"
      ],
      "imageFileList": null
    },
    {
      "id": 2,
      "destination": "LA_MOJARRA",
      "description": "Tour de escalada deportiva en La Mojarra para escaladores de nivel intermedio, incluye almuerzo, alquiler de equipo, acompañamiento de un guía certificado y el valor de ingreso al parque. ",
      "categoryId": 1,
      "climbingStyle": "SPORT",
      "level": "INTERMEDIATE",
      "day": "MON",
      "schedule": "14:00",
      "imageUrlList": [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227803/tours/tours/null-1732227795666-mojarra2.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227804/tours/tours/null-1732227804070-mojarra1.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227806/tours/tours/null-1732227805160-climbing-gear.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732227807/tours/tours/null-1732227806690-hcarne.jpg.jpg"
      ],
      "imageFileList": null
    },
    {
      "id": 3,
      "destination": "LA_MOJARRA",
      "description": "Tour de escalada deportiva en La Mojarra para escaladores principiantes en modalidad de yoyo o top-rope. El tour incluye almuerzo, alquiler de equipo, aseguramiento de un guía certificado y el valor de ingreso al parque.",
      "categoryId": 1,
      "climbingStyle": "TOP_ROPE",
      "level": "BEGINNER",
      "day": "TUE",
      "schedule": "13:00",
      "imageUrlList": [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732228451/tours/tours/null-1732228450058-climbing-gear.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732228452/tours/tours/null-1732228451892-mojarra3.jpg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732228454/tours/tours/null-1732228453457-falafel.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732228455/tours/tours/null-1732228454959-ferrata.jpeg.jpg"
      ],
      "imageFileList": null
    },
    {
      "id": 6,
      "destination": "CHICAMOCHA",
      "description": "Visita al cañón del Chicamocha en teleférico. Incluye alimentación y entrada al parque.",
      "categoryId": 4,
      "climbingStyle": null,
      "level": null,
      "day": "FRI",
      "schedule": "08:00",
      "imageUrlList": [
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732322612/tours/tours/CHICAMOCHA-1732322611348-chicamocha.jpeg.jpg",
        "https://res.cloudinary.com/duzex09zh/image/upload/v1732322614/tours/tours/CHICAMOCHA-1732322613800-shawarma.jpeg.jpg"
      ],
      "imageFileList": null
    }
  ]

  useEffect(() => {
    setTours(toursApi); // Asigna toursApi al estado tours
  }, []);

  const handleLoadMoreTours = () => {
    setVisibleTours((prevCount) => prevCount + 3);
  };

  return (
    <div className="container-tours">
      <NavBar />
      <div className="tours-container">
        <h1 className="tours-title">Tours</h1>
        <p className="tours-description">
          Descubre la emoción de la aventura con nuestros tours únicos. Explora
          nuevos destinos, desafía tus límites y vive experiencias inolvidables.
          ¡Revisa nuestros tours y empieza tu próxima gran aventura hoy mismo!
        </p>
        <ProductGrid products={tours.slice(0, visibleTours)} />
        {visibleTours < tours.length && (
          <BtnPrimary
            onClick={handleLoadMoreTours}
            className="btn-primarySection btn-load-more"
          >Cargar más tours</BtnPrimary>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Tours;
