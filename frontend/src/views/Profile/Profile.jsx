import { useState, useEffect } from "react";
import ProfilePage from "../../components/Profile/ProfilePage/ProfilePage";
import ProfileImageUpload from "../../components/Profile/ImageUpload/ProfileImageUpload";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const ProfileAdd = () => {
    const [userData, setUserData] = useState(null); // Información del usuario
    const userId = sessionStorage.getItem("sub"); // ID único del usuario
    const urlBack = "https://ramoja-tours.up.railway.app";

    useEffect(() => {
        if (userId) {
            axios
                .get(`${urlBack}/api/user/${userId}`)
                .then((response) => setUserData(response.data))
                .catch((error) =>
                    console.error("Error al obtener la información del usuario:", error)
                );
        }
    }, [userId]);

    return (
        <div>
          <Navbar/>
            {userData ? (
                <>
                    {/* Carga de Imagen de Perfil */}
                    <ProfileImageUpload
                        userId={userId}
                        setUserData={setUserData} // Pasa la función para actualizar la data
                    />

                    {/* Información y Favoritos */}
                    <ProfilePage
                        userData={userData}
                        setUserData={setUserData} // Por si necesitas sincronizar cambios
                    />
                </>
            ) : (
                <p>Cargando información del usuario...</p>
            )}
          <Footer/>  
        </div>
    );
};

export default ProfileAdd;
