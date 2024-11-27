import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Fuse from 'fuse.js'; // Importamos Fuse.js
import 'react-datepicker/dist/react-datepicker.css';
import BtnPrimary from '../Buttons/BtnPrimary/BtnPrimary';
import './searchSection.css';
import RecommendationDetailCard from '../RecommendationDetailCard/RecommendationDetailCard';

const SearchSection = () => {
    const apiUrl = "https://ramoja-tours.up.railway.app/api/tours";
    const [results, setResults] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const [error, setError] = useState(null);

    const handleClick = () => {
        navigate("/tours");
        window.scrollTo(0, 0);
    };

    const handleSearch = async () => {
        if (!keyword || !selectedDate) {
            alert("Por favor, completa la palabra clave y selecciona una fecha.");
            return;
        }

        setError(null);

        try {
            const response = await axios.get(apiUrl);
            const tours = response.data;

            const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

            
            const fuse = new Fuse(tours, {
                keys: ['description'], 
                threshold: 0.6, 
            });

            const fuseResults = fuse.search(keyword);

            const matchingTours = fuseResults
                .map(result => result.item) 
                .filter(tour => tour.day === selectedDay); 

            setResults(matchingTours);
        } catch (err) {
            setError("Ocurrió un error al obtener los datos. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div>
            <div className="search-section">
                <h2 className="title">Explora La Mojarra</h2>
                <p className="searcDescription">
                    Descubre increíbles tours de escalada. Usa el buscador para encontrar
                    la aventura que se adapte a tus necesidades.
                </p>

                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="¿Qué aventura buscas?"
                        className="search-input"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText="Selecciona una fecha"
                        className="search-input"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()} 
                    />
                    <BtnPrimary onClick={handleSearch}>Buscar</BtnPrimary>
                </div>
            </div>

            <div className="result-section">
                {error && <p className="error">{error}</p>}
                {keyword && results.length === 0 && (
                    <p>No se encontraron resultados para la búsqueda.</p>
                )}
                {results.length > 0 && (
                    results.map((tour) => (
                        <RecommendationDetailCard
                            key={tour.id}
                            nameTour={tour.destination}
                            description={tour.description}
                            urlSrc={tour.imageUrlList?.[0]}
                            onClick={handleClick} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchSection;
