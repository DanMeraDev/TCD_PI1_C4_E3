import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import './ProfilePage.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null); // Información del usuario
    const [favorites, setFavorites] = useState([]); // Lista de favoritos
    const userId = sessionStorage.getItem("sub"); // ID único del usuario
    const urlBack = "https://ramoja-tours.up.railway.app";

    useEffect(() => {
        if (userId) {
            // Obtener información básica del usuario
            axios.get(`${urlBack}/api/user/${userId}`)
                .then((response) => setUserData(response.data))
                .catch((error) => console.error("Error al obtener la información del usuario:", error));

            // Obtener favoritos del usuario
            axios.get(`${urlBack}/api/favorites/user/${userId}`)
                .then((response) => {
                    const tourIds = response.data.map(favorite => favorite.tourId);
                    const fetchTours = tourIds.map(tourId =>
                        axios.get(`${urlBack}/api/tours/${tourId}`)
                    );

                    Promise.all(fetchTours)
                        .then(toursResponse => {
                            const tourData = toursResponse.map(res => res.data);
                            setFavorites(tourData);
                        })
                        .catch(error => console.error("Error al obtener los tours favoritos:", error));
                })
                .catch((error) => console.error("Error al obtener los favoritos:", error));
        }
    }, [userId]);

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <h1>Perfil del Usuario</h1>

                {/* Información básica del usuario */}
                {userData ? (
                    <div className="user-info">
                        <h2>{userData.name}</h2>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Teléfono:</strong> {userData.phone || "No proporcionado"}</p>
                        <p><strong>Grado de Escalada:</strong>{userData.grade|| "No proporcionado"}</p>
                        <p><strong>Nivel de Usuario:</strong>{userData.level|| "No proporcionado"}</p>
                    </div>
                ) : (
                    <p>Cargando información del usuario...</p>
                )}

                {/* Sección de favoritos */}
                <div className="favorites-section">
                    <h2>Favoritos</h2>
                    {favorites.length > 0 ? (
                        <div className="favorites-list">
                            {favorites.map((tour) => (
                                <div key={tour.id} className="favorites-card">
                                    <h3>{tour.title}</h3>
                                    <p>{tour.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No tienes tours favoritos aún.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
