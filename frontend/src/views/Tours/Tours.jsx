import { useEffect, useState } from "react";
import mockTours from "../../utils/functions/mockTours";
import randomData from "../../utils/functions/randomData";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./Tours.css";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BtnPrimary from "../../components/Buttons/BtnPrimary/BtnPrimary";
import { getAllTours } from "../../utils/axios/getAllTours";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        {loading && <p className="loading-text">Cargando tours...</p>}
        {!loading && error && <p className="error-text">{error}</p>}

        {!loading && !error && tours.length > 0 && (
          <>
            <ProductGrid products={tours.slice(0, visibleTours)} />
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
      </div>

      <Footer />
    </div>
  );
};

export default Tours;
