import AvailabilityCalendar from "../../components/Calendar/AvailabilityCalendar";

const CalendarTours = () => {

  // Datos simulados para dias disponible y ocupados por tours
  const availableDates = [
    "2024-11-25",
    "2024-11-27",
    "2024-12-01",
    "2024-12-03",
    "2024-12-05",
  ];
  const occupiedDates = ["2024-11-26", "2024-11-28", "2024-12-02"];
  const tourDay = "FRI";

  const hasError = false;

  //---------------

  return (
    <div style={{ margin: "20px" }}>
      <h1>Calendario de Disponibilidad</h1>
      <AvailabilityCalendar
        title="Disponibilidad del Tour"
        day={hasError ? null : tourDay}
        availableDates={hasError ? null : availableDates}
        occupiedDates={hasError ? null : occupiedDates}
      />
    </div>
  );
};

export default CalendarTours;
