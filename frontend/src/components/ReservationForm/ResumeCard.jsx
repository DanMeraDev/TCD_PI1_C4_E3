/* eslint-disable react/prop-types */
import "./ResumeCard.css";
import { destinos, dias, climbingStyles, categoria } from "../../utils/constants";



  // Utility functions to find the corresponding label
  const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
  const getDayLabel = (value) => dias.find((d) => d.value === value)?.label || value;
  const getClimbingStyleLabel = (value) => climbingStyles.find((c) => c.value === value)?.label || value;
  const getCategoryLabel = (value) => categoria.find((c)=> c.value === value)?.label || value;
  const getCategoryImgSrc = (value) => categoria.find((c)=> c.value === value)?.imageSrc || value;

const ResumeCard = ({ product }) => {

  const categoryImageSrc = getCategoryImgSrc(product.categoryId);

  return (
    <div className="card-container-product">
      <div className="image-section">
        <img
          src={product.imageUrlList[1]}
          alt={product.destination}
          className="tour-image"
        />
        <span className="image-count">{product.imageUrlList.length} Fotos</span>
      </div>

      <div className="content-section">
        <div className="info-section">
          <div className="header-product">
            <h3 className="destination-title">
            {categoryImageSrc && (
                <img
                  src={categoryImageSrc}
                  alt="icon"
                  className="category-icon"
                />
              )}
              {getCategoryLabel(product.categoryId)} en {getDestinationLabel(product.destination)}</h3>
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
      </div>
    </div>
  );
};

export default ResumeCard;
