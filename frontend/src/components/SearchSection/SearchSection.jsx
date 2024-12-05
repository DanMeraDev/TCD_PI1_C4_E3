import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BtnPrimary from '../Buttons/BtnPrimary/BtnPrimary';
import './searchSection.css';
import SearchDetailCard from './SearchDetailCard';

const SearchSection = () => {
    const apiUrl = "https://ramoja-tours.up.railway.app/api/tours";
    const [results, setResults] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [error, setError] = useState(null);
    const [tours, setTours] = useState([]);

    useEffect(() => {
        // Obtener todos los tours al montar el componente
        const fetchTours = async () => {
            try {
                const response = await axios.get(apiUrl);
                setTours(response.data);
            } catch (err) {
                setError("Ocurrió un error al obtener los datos. Inténtalo de nuevo más tarde.");
            }
        };
        fetchTours();
    }, []);

    const filterResults = () => {
        if (!keyword && !selectedDate) {
            setResults([]);
            return;
        }

        const selectedDay = selectedDate
            ? selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
            : null;

        const fuse = new Fuse(tours, {
            keys: ['description', 'destination'],
            threshold: 0.6,
        });

        const fuseResults = keyword ? fuse.search(keyword).map(result => result.item) : tours;

        const matchingTours = fuseResults.filter(tour =>
            selectedDay ? tour.day === selectedDay : true
        );

        setResults(matchingTours);
    };

    useEffect(() => {
        filterResults(); // Filtrar resultados cada vez que keyword o selectedDate cambien
    }, [keyword, selectedDate]);

    const clearResults = () => {
        setResults([]);
        setKeyword('');
        setSelectedDate(null);
    };

    return (
        <div>
            <div className="search-section">
                <h2 className="searchTitle">Explora La Mojarra</h2>
                <p className="searchDescription">
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
                    <BtnPrimary onClick={clearResults}>Limpiar</BtnPrimary>
                </div>
            </div>

            <div className="results">
                <div className="result-section">
                    {error && <p className="error">{error}</p>}
                    {results.length > 0 && (
                        results.map((tour) => (
                            <SearchDetailCard
                                key={tour.id}
                                nameTour={tour.destination}
                                description={tour.description}
                                urlSrc={tour.imageUrlList?.[0]}
                            />
                        ))
                    )}
                </div>
                {results.length > 0 && (
                    <button
                        className="clear-button"
                        onClick={() => {
                            clearResults();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        &#x2715;
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchSection;
