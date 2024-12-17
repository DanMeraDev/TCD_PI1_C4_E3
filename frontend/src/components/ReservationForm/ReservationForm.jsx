import React, { useState, useEffect } from "react";
import "./ReservationForm.css";
import { useParams } from "react-router-dom";
import { decodeToken, isTokenExpired } from "../../utils/functions/jwt";
import { destinos, categoria } from "../../utils/constants";
import ResumeCard from "./ResumeCard";
import Modal from 'react-modal';
import AvailabilityCalendar from '../Calendar/AvailabilityCalendar';


const getDestinationLabel = (value) => destinos.find((d) => d.value === value)?.label || value;
const getCategoryLabel = (value) => categoria.find((c) => c.value === value)?.label || value;

const ReservationForm = () => {
  //TOUR DATA
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  //FORM
  const [diet, setDiet] = useState("NORMAL");
  const [includeLunch, setIncludeLunch] = useState(false);
  const [includeEquipment, setIncludeEquipment] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [userData, setUserData] = useState({});

  //DATE MODAL
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '350px',
      width: '50%',
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occupiedDates, setOccupiedDates] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const BASE_URL = "https://ramoja-tours.up.railway.app";

  // Obtener el ID del usuario del token
  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      try {
        const userId = decodeToken(token).sub;
        setUserId(userId)// Obtener el ID del usuario
      } catch (error) {
        console.error("Error obtener información del token:", error);
      }
    }
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`https://ramoja-tours.up.railway.app/api/tours/${tourId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }
        const data = await response.json();
        setTour(data);
        setCurrentImage(data.imageUrlList[0]); // set default image as the first image.
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  // Calcular el costo total
  useEffect(() => {
    const basePrice = 120.0;
    let cost = basePrice;
    if (includeLunch) cost += 25;
    if (includeEquipment) cost += 40;
    setTotalCost(cost);
  }, [includeLunch, includeEquipment]);

  // Obtener el userId al cargar el componente
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    getUserIdFromToken();
    if(user){
        setUserData(user)
    }
  }, []);




  const fetchOccupiedDates = async () => {
    try {
      const response = await fetch(`https://ramoja-tours.up.railway.app/api/reservations/tours/${tourId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch occupied dates');
      }
      const data = await response.json();
      const dates = data.map(reservation => reservation.date); // Extract dates
      setOccupiedDates(dates);
    } catch (err) {
      console.error('Error fetching occupied dates:', err);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedDate || !userId || !tourId || !totalCost) {
      setError("Por favor, completa todos los campos obligatorios.");
      console.log(selectedDate, userId, tourId, diet, totalCost)
      return;
    }

    const reservationData = {
      userId,
      tourId,
      diet,
      includeLunch,
      includeEquipment,
      date: selectedDate,
      totalCost,
    };

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/reservations`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setSuccess("Reserva realizada con éxito.");
        //BORRAR FORMULARIO PARA EVITAR DOBLE ENVIO
      } else {
        const error = await response.json();
        setError(error.message || "Error al realizar la reserva.");
      }
    } catch (error) {
      setError("Hubo un problema al conectar con el servidor.");
    }
  };

  const openModal = async () => {
    await fetchOccupiedDates(); // Fetch occupied dates before opening the modal
    setIsModalOpen(true);
  }

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="reservation-main">
      {loading && <p>Loading...</p>}
      

      {tour &&
        <div className="reservation-detail">
          {/* Imagen del Tour */}
          <div className="reservation-detail-image">
            <img src={currentImage} alt={"reservation-image"} />
          </div>

          {/* Detalles del Tour y Formulario */}
          <div className="reservation-detail-info">
            <h1>Reserva para {getCategoryLabel(tour.categoryId)} en {getDestinationLabel(tour.destination)}</h1>
            <span className="greeting-data">{userData && `Hola, ${userData.name} (${userData.email}) aquí están los `}detalles de tu reserva</span>
            <ResumeCard product={tour} />
            <form onSubmit={handleSubmit} className="reservation-options">

              <div className="date-container">
                <div>
                  <span><strong>Fecha Salida:</strong> {selectedDate}</span>
                </div>
                <div className="calendar" onClick={openModal}>
                  <span > 📅Seleccionar fecha</span>
                </div>
              </div>

              <div className="lunch-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={includeLunch}
                    onChange={(e) => setIncludeLunch(e.target.checked)}
                  />
                  Incluir Almuerzo (+25.0)
                </label>
              </div>
              <div className="diet-option">
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


              <div className="equipment-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={includeEquipment}
                    onChange={(e) => setIncludeEquipment(e.target.checked)}
                  />
                  Alquilar Equipo (+40.0)
                </label>
              </div>

              <div className="total-summary">
                <strong>Costo Total:</strong> ${totalCost.toFixed(2)}
              </div>

              <button type="submit" className="reserve-button">
                Reservar
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="Availability Calendar"
            ariaHideApp={false}
          >
            <AvailabilityCalendar
              day={tour.day}
              title="Seleccione una fecha"
              availableDates={tour.availableDates || []}
              occupiedDates={occupiedDates}
              onDateSelected={(date) => {
                console.log("Selected Date:", date);
                setSelectedDate(date);
                closeModal();
              }}
            />
            <p onClick={closeModal} className="modal-close-button">Cerrar</p>
          </Modal>
        </div>

      }
    </div>
  );
};

export default ReservationForm;
