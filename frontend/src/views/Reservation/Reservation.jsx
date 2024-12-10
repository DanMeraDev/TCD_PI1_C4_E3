import ReservationForm from "../../components/ReservationForm/ReservationForm";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Reservation = () => {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ReservationForm />
        </main>
        <Footer />
      </>
    );
  };
  
  export default Reservation;
  