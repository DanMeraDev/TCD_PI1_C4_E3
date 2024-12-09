import { useNavigate } from "react-router-dom";


const LogoHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="logo-header" onClick={()=>navigate("/")}>
      <img src="/src/assets/Img/Logo_nav.png" alt="ramoja-logo" className="logo-image" />
      <h3>Mojarra Tours Admin</h3>
    </div>
  );
};

export default LogoHeader;