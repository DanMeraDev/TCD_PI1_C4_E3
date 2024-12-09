import LogoHeader from "./LogoHeader";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import Footer from "./Footer";
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const Sidebar = ({ onSectionChange }) => {
  const navigate = useNavigate(); 
  const {name, email} = JSON.parse(sessionStorage.getItem('user'));
 
  const handleLogoutClick = () => {
    
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("sub");
    sessionStorage.removeItem("token")
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <LogoHeader />
      <UserProfile name={name} email={email} />
      <NavLinks onSectionChange={onSectionChange}/>
      <Footer onLogoutClick={handleLogoutClick} onGoBackHome={()=> navigate('/')}/> 
    </aside>
  );
};

export default Sidebar;
