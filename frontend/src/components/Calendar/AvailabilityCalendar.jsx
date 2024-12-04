import Calendar from "react-calendar";
import "./AvailabilityCalendar.css";
import { useEffect, useState } from "react";

const AvailabilityCalendar = ({
  day,
  title,
  availableDates = [],
  occupiedDates,
  onDateSelected,
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  if (!availableDates || !occupiedDates || !day) {
    return (
      <div className="availability-calendar error">
        <h3 className="availability-calendar-title">{title || "Error"}</h3>
        <p className="error-message">
          Faltan datos necesarios para cargar el calendario. Verifica los
          parámetros.
        </p>
      </div>
    );
  }

  const getHighlightedDays = () => {
    const targetDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].indexOf(
      day
    );
    if (targetDay === -1) return [];

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const tempDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      if (tempDate.getDay() === targetDay) {
        dates.push(tempDate.toISOString().split("T")[0]);
      }
    }

    return dates;
  };

  const highlightedDays = getHighlightedDays();

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];

    if (occupiedDates.includes(dateString)) return "occupied";
    if (availableDates.includes(dateString)) return "available";
    if (highlightedDays.includes(dateString)) return "highlighted";

    return "";
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    // Deshabilitar fechas anteriores a la actual
    return date < today.setHours(0, 0, 0, 0);
  };

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split("T")[0];

    if (highlightedDays.includes(dateString)) {
      if (occupiedDates.includes(dateString)) {
        alert(`La fecha ${dateString} está ocupada para el tour.`);
      } else {
        alert(`La fecha ${dateString} está disponible para el tour.`);
        setSelectedDate(dateString);
        if (onDateSelected) onDateSelected(dateString);
      }
    } else {
      alert(`La fecha ${dateString} no es un día de tour.`);
    }
  };

  return (
    <div className="availability-calendar">
      <h3 className="availability-calendar-title">{title}</h3>

      <Calendar
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        onClickDay={handleDateClick}
      />

      <div className="date-indicators">
        <p>
          <span className="occupied-indicator"></span> Fechas ocupadas
        </p>
        <p>
          <span className="available-indicator"></span> Fechas disponibles
        </p>
        {/* <p>
          <span className="highlighted-indicator"></span> Fecha del Tour
        </p> */}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
