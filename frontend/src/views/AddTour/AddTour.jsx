import AddTourForm from "../../components/AdminPanel/AddTourForm/AddTourForm";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const AddTour = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AddTourForm />
      </main>
      <Footer />
    </>
  );
};

export default AddTour;

