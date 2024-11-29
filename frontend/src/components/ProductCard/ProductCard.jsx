/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { destinos, dias, climbingStyles, categoria } from "../../utils/constants";

  // Utility functions to find the corresponding label
  const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
  const getDayLabel = (value) => dias.find((d) => d.value === value)?.label || value;
  const getClimbingStyleLabel = (value) => climbingStyles.find((c) => c.value === value)?.label || value;
  const getCategoryLabel = (value) => categoria.find((c)=> c.value === value)?.label || value;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/tours/${product.id}`);
  };

  const handleMoreInfo = () => {
    navigate(`/tours/info/${product.id}`)
  }

  return (
    <div className="card-container-product">
      <div className="image-section">
        <img
          src={product.imageUrlList[0]}
          alt={product.destination}
          className="tour-image"
        />
        <span className="image-count">{product.imageUrlList.length} Fotos</span>
      </div>

      <div className="content-section">
        <div className="info-section">
          <div className="header-product">
            <h3 className="destination-title">{getCategoryLabel(product.categoryId)} en {getDestinationLabel(product.destination)}</h3>
            <span className="level-tag">{product.level}</span>
          </div>
          <p className="description-product">{product.description}</p>
          { product.climbingStyle && <p className="card-data">
            Estilo de escalada: <strong>{getClimbingStyleLabel(product.climbingStyle)}</strong>
          </p>}
          <p className="card-data">
            Dia: <strong>{getDayLabel(product.day)}</strong>
          </p>
          <p className="card-data">
            Salida: <strong>{product.schedule}</strong>
          </p>
        </div>
        <div className="card-buttons">
          <button className="btn-primarySection primary" onClick={handleReserve}>
            Reservar
          </button>
          <button className="btn-primarySection secondary" onClick={handleMoreInfo}>Saber más</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
