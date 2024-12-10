import "./SearchDetailCard.css";
import { useNavigate } from "react-router-dom";

const SearchDetailCard = ({
  id, 
  nameTour,
  description,
  urlSrc,
}) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`/tours/info/${id}`); 
  };

  return (
    <div
      className="card-container"
      onClick={handleCardClick} 
      style={{ cursor: "pointer" }} 
    >
      <div className="card-detail">
        <div className="card-info">
          <h3 className="title">{nameTour}</h3>
          <p className="description">{description}</p>
        </div>
        <img className="card-image" src={urlSrc} alt={nameTour} />
      </div>
    </div>
  );
};

export default SearchDetailCard;

