import AvailabilityCalendar from "../Calendar/AvailabilityCalendar.jsx";
import "./TourCardCalendar.css";

const TourCardCalendar = ({ tour }) => {
  const { destination, day } = tour;

  return (
    <div className="tour-card-calendar">
      {/* <h2 className="tour-card-calendar-title">{destination}</h2> */}
      <AvailabilityCalendar day={day} title={`Tour: ${destination}`} />
    </div>
  );
};
export default TourCardCalendar;
