import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './FavoritePage.css';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = sessionStorage.getItem("sub");
    const urlBack = "https://ramoja-tours.up.railway.app";

    useEffect(() => {
        if (userId) {
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
                        .catch(error => console.error("Error al obtener los tours:", error));
                })
                .catch((error) => console.error("Error al obtener los favoritos:", error));
        }
    }, [userId]);

    const handleRemoveFavorite = (tourId) => {
        setFavorites(prevFavorites => 
            prevFavorites.filter(favorite => favorite.id !== tourId)
        );
    };

    return (
        <>
            <Navbar />
            <div className="favorites-page">
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
            <Footer />
        </>
    );
};

export default FavoritesPage;
