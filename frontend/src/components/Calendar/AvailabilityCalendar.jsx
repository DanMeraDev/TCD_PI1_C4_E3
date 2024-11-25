import Calendar from "react-calendar";
import "./AvailabilityCalendar.css";
import { useEffect, useState } from "react";

const AvailabilityCalendar = ({
  day,
  title,
  availableDates,
  occupiedDates,
}) => {

  if (!availableDates || !occupiedDates || !day) {
    return (
      <div className="availability-calendar error">
        <h3 className="availability-calendar-title">{title || "Error"}</h3>
        <p className="error-message">
          Faltan datos necesarios para cargar el calendario. Verifica los parámetros.
        </p>
      </div>
    );
  }
  
  const getHighlightedDays = () => {
    const targetDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].indexOf(day);
    if (targetDay === -1) return [];

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const tempDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
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

  return (
    <div className="availability-calendar">
      <h3 className="availability-calendar-title">{title}</h3>

      <Calendar tileClassName={tileClassName} />

      <div className="date-indicators">
        <p><span className="occupied-indicator"></span> Fecha ocupada</p>
        <p><span className="available-indicator"></span> Fecha disponible</p>
        <p><span className="highlighted-indicator"></span> Fecha del Tour</p>
      </div>

    </div>
  );
};

export default AvailabilityCalendar;
