import BtnPrimary from '../Buttons/BtnPrimary/BtnPrimary';
import './searchSection.css';

const SearchSection = () => {
    return (
        <div className="search-section">
            <div className='search-content'>
                <input type="text" placeholder="Que Aventura Buscas ?" className="search-input" />
                <BtnPrimary>Buscar</BtnPrimary>
            </div>
        </div>
    );
};

export default SearchSection;