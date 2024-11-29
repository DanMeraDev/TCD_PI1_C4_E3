import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleReserve = () => {
    navigate(`/tours/${product.id}`);
  };

  const handleShare = () => {
    setShowSharePopup(true); // Mostrar la ventana emergente.
  };

  const closePopup = () => {
    setShowSharePopup(false);
  };

  const shareOnSocialMedia = (platform) => {
    const shareUrl = `${window.location.origin}/tours/${product.id}`;
    const text = `¡Mira este increíble producto: ${product.name}! ${product.description}`;
    const image = product.image;
  
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
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <h2 className="product-title">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <div className="button-container">
        <button className="button more-info">Saber más</button>
        <button className="button reserve" onClick={handleReserve}>
          Reservar
        </button>
        <button className="button share" onClick={handleShare}>
          Compartir
        </button>
      </div>

      {showSharePopup && (
        <div className="share-popup">
          <div className="popup-content">
            <h3>Compartir producto</h3>
            <p>{product.name}</p>
            <img src={product.image} alt={product.name} className="popup-image" />
            <textarea
              defaultValue={`¡Mira este increíble producto: ${product.name}! ${product.description}`}
              rows="3"
              className="share-message"
            />
            <div className="social-buttons">
              <button onClick={() => shareOnSocialMedia("facebook")}>Facebook</button>
              <button onClick={() => shareOnSocialMedia("twitter")}>Twitter</button>
              <button onClick={() => shareOnSocialMedia("whatsapp")}>WhatsApp</button>
            </div>
            <button className="close-popup" onClick={closePopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
