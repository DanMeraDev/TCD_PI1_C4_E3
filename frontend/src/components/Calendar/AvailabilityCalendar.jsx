import Calendar from "react-calendar";
import "./AvailabilityCalendar.css";

const AvailabilityCalendar = ({ day, title }) => {
  const getHighlightedDates = () => {
    const currentDate = new Date();
    const dates = [];
    const targetDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].indexOf(day);

    for (let i = 0; i < 60; i++) {
      const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      if (tempDate.getDay() === targetDay) {
        dates.push(tempDate.toISOString().split("T")[0]);
      }
    }

    return dates;
  };

  const highlightedDates = getHighlightedDates();

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    return highlightedDates.includes(dateString) ? "highlighted" : "";
  };

  return (
    <div className="availability-calendar">
      <h3 className="availability-calendar-title">{title}</h3>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default AvailabilityCalendar;
