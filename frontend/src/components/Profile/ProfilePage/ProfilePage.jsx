import { useState, useEffect } from "react";
import axios from "axios";
import './ProfilePage.css';
import ProductCard from "../../ProductCard/ProductCard";

const ProfilePage = ({ userData, setUserData }) => {
    const [favorites, setFavorites] = useState([]); // Lista de favoritos
    const userId = sessionStorage.getItem("sub"); // ID único del usuario
    const urlBack = "https://ramoja-tours.up.railway.app";

    useEffect(() => {
        if (userId) {
            // Obtener favoritos del usuario
            axios
                .get(`${urlBack}/api/favorites/user/${userId}`)
                .then((response) => {
                    const tourIds = response.data.map((favorite) => favorite.tourId);
                    const fetchTours = tourIds.map((tourId) =>
                        axios.get(`${urlBack}/api/tours/${tourId}`)
                    );

                    Promise.all(fetchTours)
                        .then((toursResponse) => {
                            const tourData = toursResponse.map((res) => res.data);
                            setFavorites(tourData);
                        })
                        .catch((error) =>
                            console.error("Error al obtener los tours favoritos:", error)
                        );
                })
                .catch((error) =>
                    console.error("Error al obtener los favoritos:", error)
                );
        }
    }, [userId]);
    const handleRemoveFavorite = (tourId) => {
        setFavorites(prevFavorites => 
            prevFavorites.filter(favorite => favorite.id !== tourId)
        );
    };

    return (
        <>
            <div className="profile-page">
                <h1>Perfil del Usuario</h1>

                {/* Información básica del usuario */}
                <div className="user-info">
                    <h2>{userData.name}</h2>
                    <p>
                        <strong>Email:</strong> {userData.email}
                    </p>
                    <p>
                        <strong>Teléfono:</strong>{" "}
                        {userData.phone || "No proporcionado"}
                    </p>
                    <p>
                        <strong>Grado de Escalada:</strong>{" "}
                        {userData.grade || "No proporcionado"}
                    </p>
                    <p>
                        <strong>Nivel de Usuario:</strong>{" "}
                        {userData.level || "No proporcionado"}
                    </p>
                </div>

                {/* Sección de favoritos */}
                <div className="favorites-section">
                <h1>FAVORITOS</h1>
                <div className="favorites-list">
                    {favorites.length > 0 ? (
                        favorites.map((product) => (
                            <div key={product.id} className="favorites-card">
                                <ProductCard 
                                    product={product} 
                                    onFavoriteRemove={handleRemoveFavorite}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No tienes tours favoritos aún.</p>
                    )}
                </div>
            </div>
            </div>
        </>
    );
};

export default ProfilePage;
