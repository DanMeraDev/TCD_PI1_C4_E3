import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = ({ phoneNumber, message }) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message || "¡Hola! Me gustaría hacer una consulta.");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button className="whatsapp-button" onClick={handleWhatsAppClick} aria-label="Contactar por WhatsApp">
      <img src="src/assets/Img/WA_icon.png" alt="WhatsApp" className="whatsapp-icon" />
    </button>
  );
};

export default WhatsAppButton;
