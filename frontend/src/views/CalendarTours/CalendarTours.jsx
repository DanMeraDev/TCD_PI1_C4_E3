import { useState } from "react";
import AvailabilityCalendar from "../../components/Calendar/AvailabilityCalendar";

const CalendarTours = () => {
  const [selectedDate, setSelectedDate] = useState("");

  // Datos simulados para dias disponible y ocupados por tours
  const occupiedDates = ["2024-11-26", "2024-11-29", "2024-12-06"];
  const tourDay = "FRI";

  const hasError = false;

  //---------------

  return (
    <div style={{ margin: "20px" }}>
      <h1>Calendario de Disponibilidad</h1>
      <AvailabilityCalendar
        title="Disponibilidad del Tour"
        day={hasError ? null : tourDay}
        availableDates={hasError ? null : []}
        occupiedDates={hasError ? null : occupiedDates}
        onDateSelected={setSelectedDate} 
      />
      {selectedDate && (
        <p>Has seleccionado la fecha: {selectedDate}</p> 
      )}
    </div>
  );
};

export default CalendarTours;
