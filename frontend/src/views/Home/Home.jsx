import Navbar from "../../components/Navbar/Navbar";
import SearchSection from "../../components/SearchSection/SearchSection";
import CategoryCarousel from "../../components/utils/Carousel/CategoryCarousel";
import RecommendationsSection from "../../components/RecommendationSection/RecommendationsSection";
import Footer from "../../components/Footer/Footer";
import "./Home.css"
import CalendarTours from "../CalendarTours/CalendarTours";
import AvailabilityCalendar from "../../components/Calendar/AvailabilityCalendar";

const Home = () => {
  return (
    <div className="home-body">
      <Navbar/>
      <SearchSection/>
      <CategoryCarousel />
      <RecommendationsSection />
      {/* <CalendarTours /> */}
      <AvailabilityCalendar day={"MON"} title={"Tour: La Mojarra"}/>
      <Footer/>
    </div>
  );

};

export default Home;
