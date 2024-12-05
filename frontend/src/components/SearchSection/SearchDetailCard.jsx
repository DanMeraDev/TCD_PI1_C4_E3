import "./SearchDetailCard.css";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";

const SearchDetailCard = ({
  nameTour,
  description,
  onClick,
  urlSrc,
}) => {
  return (
    <div className="card-container">
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
