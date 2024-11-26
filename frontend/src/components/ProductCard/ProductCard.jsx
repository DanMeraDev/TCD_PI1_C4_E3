import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

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
            <h3 className="destination-title">{product.destination}</h3>
            <span className="level-tag">{product.level}</span>
          </div>
          <p className="description-product">{product.description}</p>
          <p className="cdimbing-style">
            Estilo de escalada: {product.climbingStyle}
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
