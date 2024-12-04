import Navbar from "../../components/Navbar/Navbar";
import SearchSection from "../../components/SearchSection/SearchSection";
import CategoryCarousel from "../../components/utils/Carousel/CategoryCarousel";
import RecommendationsSection from "../../components/RecommendationSection/RecommendationsSection";
import Footer from "../../components/Footer/Footer";
import "./Home.css"
// import CalendarTours from "../CalendarTours/CalendarTours";
import AvailabilityCalendar from "../../components/Calendar/AvailabilityCalendar";
import CalendarTours from "../CalendarTours/CalendarTours";

const Home = () => {
  return (
    <div className="home-body">
      <Navbar/>
      <SearchSection/>
      <CategoryCarousel />
      <RecommendationsSection />
      {/* <CalendarTours /> */}
      {/* solo de prueba para el calendario de un tour especifico */}
      {/* <AvailabilityCalendar day={"MON"} title={"Tour: La Mojarra"}/> */}
      <CalendarTours />
      <Footer/>
    </div>
  );

};

export default Home;
