import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ReservationForm.css";
import tourImage from "../../assets/Img/mojarra1.jpg";

const ReservationForm = ({ tourId, tourName, description, basePrice = 100 }) => {
  const [diet, setDiet] = useState("NORMAL");
  const [includeLunch, setIncludeLunch] = useState(false);
  const [includeEquipment, setIncludeEquipment] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [schedule, setSchedule] = useState("");
  const [totalCost, setTotalCost] = useState(basePrice);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASE_URL = "https://ramoja-tours.up.railway.app";

  // Obtener el ID del usuario del token
  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub; // Obtener el ID del usuario
      } catch (error) {
        console.error("Error al parsear el token:", error);
      }
    }
    return null;
  };

  // Calcular el costo total
  useEffect(() => {
    let cost = basePrice;
    if (includeLunch) cost += 20;
    if (includeEquipment) cost += 30;
    setTotalCost(cost);
  }, [includeLunch, includeEquipment, basePrice]);

  // Obtener el userId al cargar el componente
  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
    console.log(id)
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedDate || !difficulty || !schedule) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const reservationData = {
      userId,
      tourId,
      diet,
      includeLunch,
      includeEquipment,
      date: selectedDate,
      difficulty,
      schedule,
      totalCost,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setSuccess("Reserva realizada con éxito.");
      } else {
        const error = await response.json();
        setError(error.message || "Error al realizar la reserva.");
      }
    } catch (error) {
      setError("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div>
      <div className="tour-detail">
        {/* Imagen del Tour */}
        <div className="tour-detail-image">
          <img src={tourImage} alt={tourName || "Tour"} />
        </div>

        {/* Detalles del Tour y Formulario */}
        <div className="tour-detail-info">
          <h1>{tourName || "Tour de Escalada"}</h1>
          <p>{description || "Vive una experiencia inolvidable en este tour único."}</p>

          <form onSubmit={handleSubmit} className="tour-options">
            <div className="form-group">
              <label htmlFor="date">Fecha del Tour:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Horario:</label>
              <select
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                required
              >
                <option value="">Selecciona un horario</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Dificultad:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="">Selecciona una dificultad</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="diet">Alimentación:</label>
              <select
                id="diet"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
              >
                <option value="NORMAL">Proteína animal y vegetales</option>
                <option value="VEGETARIAN">Vegetariano</option>
                <option value="VEGAN">Vegano</option>
                <option value="GLUTEN_FREE">Sin Gluten</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeLunch}
                  onChange={(e) => setIncludeLunch(e.target.checked)}
                />
                Incluir Almuerzo (+20.0)
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeEquipment}
                  onChange={(e) => setIncludeEquipment(e.target.checked)}
                />
                Alquilar Equipo (+30.0)
              </label>
            </div>

            <div className="form-summary">
              <strong>Costo Total:</strong> ${totalCost.toFixed(2)}
            </div>

            <button type="submit" className="reserve-button">
              Reservar
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
    </div>
  );
};

ReservationForm.propTypes = {
  tourId: PropTypes.number.isRequired,
  tourName: PropTypes.string,
  description: PropTypes.string,
  basePrice: PropTypes.number,
};

ReservationForm.defaultProps = {
  tourName: "Tour de Escalada",
  description: "Vive una experiencia inolvidable en este tour único.",
  basePrice: 100,
};

export default ReservationForm;
