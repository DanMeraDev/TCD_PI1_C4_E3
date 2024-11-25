import TourCardCalendar from "../../components/TourCardCalendar/TourCardCalendar.jsx";
import { getAllTours } from "../../utils/axios/getAllTours";
import { useEffect, useState } from "react";

const CalendarTours = () => {

  //Calendario para todos los tours, solo de prueba
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAllTours();
        setTours(data);
      } catch (error) {
        console.error("Error al cargar tours:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      {tours.length > 0 ? (
        tours.map((tour) => <TourCardCalendar key={tour.id} tour={tour} />)
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CalendarTours;
