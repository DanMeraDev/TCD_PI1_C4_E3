/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { destinos, dias, climbingStyles, categoria } from "../../utils/constants";

// Utility functions to find the corresponding label
const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
const getDayLabel = (value) => dias.find((d) => d.value === value)?.label || value;
const getClimbingStyleLabel = (value) => climbingStyles.find((c) => c.value === value)?.label || value;
const getCategoryLabel = (value) => categoria.find((c) => c.value === value)?.label || value;
const getCategoryImgSrc = (value) => categoria.find((c) => c.value === value)?.imageSrc || value;

const SharePopup = ({ onClose, product, shareOnSocialMedia }) => {
  return ReactDOM.createPortal(
    <div className="share-popup" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Compartir tour</h3>
        <p>{product.name}</p>
        <img src={product.imageUrlList[0]} alt={product.name} className="popup-image" />
        <textarea
          defaultValue={`¡Mira este increíble tour: ${product.name}! ${product.description}`}
          rows="3"
          className="share-message"
        />
        <div className="social-buttons">
          <button onClick={() => shareOnSocialMedia("facebook")}>Facebook</button>
          <button onClick={() => shareOnSocialMedia("twitter")}>Twitter</button>
          <button onClick={() => shareOnSocialMedia("whatsapp")}>WhatsApp</button>
          <button onClick={() => shareOnSocialMedia("instagram")}>Instagram</button>
        </div>
        <button className="close-popup" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>,
    document.body // Renderiza el popup en el body
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleReserve = () => {
    navigate(`/tours/${product.id}`);
  };

  const handleMoreInfo = () => {
    navigate(`/tours/info/${product.id}`);
  };

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const closePopup = () => {
    setShowSharePopup(false);
  };

  const shareOnSocialMedia = (platform) => {
    const shareUrl = `${window.location.origin}/tours/${product.id}`;
    const text = `¡Mira este increíble producto: ${product.name}! ${product.description}`;
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`);
    } else if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)} ${encodeURIComponent(shareUrl)}`);
    } else if (platform === "instagram") {
      alert("Copia el contenido para compartir en Instagram.");
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
    } else if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: text,
          url: shareUrl,
        })
        .catch((err) => console.error("Error al compartir:", err));
    }
    closePopup();
  };

  const categoryImageSrc = getCategoryImgSrc(product.categoryId);

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
            <h3 className="destination-title">
              {categoryImageSrc && (
                <img
                  src={categoryImageSrc}
                  alt="icon"
                  className="category-icon"
                />
              )}
              {getCategoryLabel(product.categoryId)} en {getDestinationLabel(product.destination)}
            </h3>
            <span className="level-tag">{product.level}</span>
          </div>
          <p className="description-product">{product.description}</p>
          {product.climbingStyle && (
            <p className="card-data">
              Estilo de escalada: <strong>{getClimbingStyleLabel(product.climbingStyle)}</strong>
            </p>
          )}
          <p className="card-data">
            Día: <strong>{getDayLabel(product.day)}</strong>
          </p>
          <p className="card-data">
            Salida: <strong>{product.schedule}</strong>
          </p>
        </div>
        <div className="card-buttons">
          <button className="btn-primarySection primary" onClick={handleReserve}>
            Reservar
          </button>
          <button className="btn-primarySection secondary" onClick={handleMoreInfo}>
            Saber más
          </button>
          <button className="btn-primarySection share" onClick={handleShare}>
            Compartir
          </button>
        </div>
      </div>

      {showSharePopup && (
        <SharePopup
          onClose={closePopup}
          product={product}
          shareOnSocialMedia={shareOnSocialMedia}
        />
      )}
    </div>
  );
};

export default ProductCard;
