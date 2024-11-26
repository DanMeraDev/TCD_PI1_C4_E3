import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BtnPrimary from '../Buttons/BtnPrimary/BtnPrimary';
import './searchSection.css';

const SearchSection = () => {
    const [keyword, setKeyword] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!keyword || !selectedDate) {
            alert("Por favor, completa la palabra clave y selecciona una fecha.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Realizamos el GET al endpoint de tours
            const response = await axios.get('https://ramoja-tours.up.railway.app/api/tours');
            const tours = response.data;

            // Convertimos la fecha seleccionada en un día (3 primeras letras en inglés)
            const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

            // Filtramos los tours según la descripción y el día
            const matchingTours = tours.filter(tour =>
                tour.description.toLowerCase().includes(keyword.toLowerCase()) &&
                tour.day === selectedDay
            );

            setResults(matchingTours);
        } catch (err) {
            setError("Ocurrió un error al obtener los datos. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    minDate={new Date()} // Restringimos fechas anteriores
                />
                <BtnPrimary onClick={handleSearch}>Buscar</BtnPrimary>
            </div>

            {loading && <p>Cargando...</p>}
            {error && <p className="error">{error}</p>}

            <div className="results">
                {results.length > 0 ? (
                    results.map((tour) => (
                        <div key={tour.id} className="result-card">
                            <h3>{tour.destination}</h3>
                            <p>{tour.description}</p>
                            <p><strong>Día Disponible:</strong> {tour.day}</p>
                            <p><strong>Estilo de Escalada:</strong> {tour.climbingStyle}</p>
                            <p><strong>Nivel:</strong> {tour.level}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No se encontraron resultados para la búsqueda.</p>
                )}
            </div>
        </div>
    );
};

export default SearchSection;
