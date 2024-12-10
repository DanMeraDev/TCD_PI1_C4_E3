import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";

const App = () => {
  const phoneNumber = "+1234567890";
  const defaultMessage = "Hola, tengo una consulta sobre tu producto.";

  return (
    <BrowserRouter>
      <AppRouter />

      {/* Botón de WhatsApp en todas las rutas */}
      <WhatsAppButton phoneNumber={phoneNumber} message={defaultMessage} />
    </BrowserRouter>
  );
};

export default App;
