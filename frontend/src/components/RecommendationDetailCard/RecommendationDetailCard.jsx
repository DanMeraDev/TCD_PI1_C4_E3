import { FaStar } from "react-icons/fa6";
import BtnSecondary from "../Buttons/BtnSecondary/BtnSecondary";
import "./RecommendationDetailCard.css";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";

const RecommendationDetailCard = ({
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
          <div className="rating">
            <FaStar size={16} color="#FFD700" />
            <FaStar size={16} color="#FFD700" />
            <FaStar size={16} color="#FFD700" />
          </div>
          <p className="description">{description}</p>
          <BtnSecondary className="btn-see-more" >Ver más</BtnSecondary>
          
        </div>
        <img className="card-image" src={urlSrc} alt={nameTour} />
      </div>
      <BtnPrimary onClick={onClick} className="btn-reserve">Reservar</BtnPrimary>
    </div>
  );
};

export default RecommendationDetailCard;
