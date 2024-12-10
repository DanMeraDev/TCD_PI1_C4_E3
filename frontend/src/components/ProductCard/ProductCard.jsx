/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal"; // Instala react-modal: npm install react-modal
import "./ProductCard.css";
import { destinos, dias, climbingStyles, categoria } from "../../utils/constants";

// Utility functions to find the corresponding label
const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
const getDayLabel = (value) => dias.find((d) => d.value === value)?.label || value;
const getClimbingStyleLabel = (value) => climbingStyles.find((c) => c.value === value)?.label || value;
const getCategoryLabel = (value) => categoria.find((c) => c.value === value)?.label || value;
const getCategoryImgSrc = (value) => categoria.find((c) => c.value === value)?.imageSrc || value;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(""); // Default empty message

  const handleReserve = () => {
    navigate(`/tours/${product.id}`);
  };

  const handleMoreInfo = () => {
    navigate(`/tours/info/${product.id}`);
  };

  const handleOpenShareModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsModalOpen(false);
  };

  // Share URL
  const shareUrl = `https://mi-sitio.com/tours/${product.id}`;
  
  // Default message when the modal is opened
  const defaultMessage = `¡Mira este increíble tour: ${product.description}!`;
  
  // Update customMessage when modal opens (to set default message)
  useEffect(() => {
    if (isModalOpen) {
      setCustomMessage(defaultMessage); // Set default message on modal open
    }
  }, [isModalOpen]); // Run only when modal state changes

  const socialOptions = [
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage)}&url=${shareUrl}` },
    { name: "WhatsApp", url: `https://api.whatsapp.com/send?text=${encodeURIComponent(customMessage)}%20${shareUrl}` },
  ];

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
          <button className="btn-primarySection secondary" onClick={handleOpenShareModal}>
            Compartir
          </button>
        </div>
      </div>

      {/* Modal for Sharing */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={handleCloseShareModal}
  contentLabel="Compartir"
  className="Modal__Content"   // Añadir esta clase para personalizar el contenido
  overlayClassName="Modal__Overlay" // Añadir esta clase para personalizar el overlay
>
  <h3>Compartir este producto</h3>

  <div className="modal-image">
    <img 
      src={product.imageUrlList[0]} 
      alt={product.destination} 
      className="modal-product-image"
    />
  </div>

  <p>Añade un mensaje personalizado:</p>
  <textarea
    value={customMessage}
    onChange={(e) => setCustomMessage(e.target.value)}
    placeholder="Agrega tu mensaje personalizado..."
  />
  <div className="social-options">
    {socialOptions.map((option) => (
      <a key={option.name} href={option.url} target="_blank" rel="noopener noreferrer" className="social-link">
        {option.name}
      </a>
    ))}
  </div>
  <button onClick={handleCloseShareModal} className="btn-close">
    Cerrar
  </button>
</Modal>

    </div>
  );
};

export default ProductCard;