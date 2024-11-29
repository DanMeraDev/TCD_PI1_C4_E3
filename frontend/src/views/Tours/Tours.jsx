import { useEffect, useState } from "react";
import mockTours from "../../utils/functions/mockTours";
import randomData from "../../utils/functions/randomData";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./Tours.css";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BtnPrimary from "../../components/Buttons/BtnPrimary/BtnPrimary";
import { getAllTours } from "../../utils/axios/getAllTours";
import { useLocation, useSearchParams } from "react-router-dom";


const Tours = () => {
  const [tours, setTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAllTours();
        setTours(data);
      } catch (err) {
        setError("Error al cargar los tours. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleLoadMoreTours = () => {
    setVisibleTours((prevCount) => prevCount + 3);
  };

  const filterTours = () => {
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");

    let filteredTours = tours;

    if (category) {
      filteredTours = filteredTours.filter((tour) =>
        tour.categoryId==category
      );
    }
    if (keyword) {
      filteredTours = filteredTours.filter((tour) =>
        tour.destination.toLowerCase().includes(keyword.toLowerCase()) ||
        tour.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    return filteredTours;
  };

  const filteredTours = filterTours();

  return (
    <div className="container-tours">
      <NavBar />
      <div className="tours-container">
        <h1 className="tours-title">Tours</h1>
        {searchParams.get("category") && (
          <h2 className="tours-description">Estos son los tours para la categoria {searchParams.get("name")}</h2>
        )}
        <p className="tours-description">
          Descubre la emoción de la aventura con nuestros tours únicos. Explora
          nuevos destinos, desafía tus límites y vive experiencias inolvidables.
          ¡Revisa nuestros tours y empieza tu próxima gran aventura hoy mismo!
        </p>

        {loading && <p className="loading-text">Cargando tours...</p>}
        {!loading && error && <p className="error-text">{error}</p>}

        {!loading && !error && tours.length > 0 && (
          <>
            <ProductGrid products={filteredTours.slice(0, visibleTours)} />
            {visibleTours < tours.length && (
              <BtnPrimary
                onClick={handleLoadMoreTours}
                className="btn-primarySection btn-load-more"
              >
                Cargar más tours
              </BtnPrimary>
            )}
          </>
        )}
        {!loading && !error && filteredTours.length === 0 && (
          <p className="no-results-text">No se encontraron tours.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Tours;
