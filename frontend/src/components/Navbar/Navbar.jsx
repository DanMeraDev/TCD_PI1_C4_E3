import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("UK") 
  const BASE_URL =   "https://ramoja-tours.up.railway.app"; 


  const getInitials = (name) => {
    if (!name) return "UK"; //Un-Known - Valor por defecto si no hay usuario
    const words = name.split(" ");
    return words.map(word => word.charAt(0).toUpperCase()).join("");
  };

  
  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem("isLoggedIn");
    const adminStatus = sessionStorage.getItem("isAdmin");
    const userId = sessionStorage.getItem("sub")

    setIsLoggedIn(loggedInStatus === "true");
    setIsAdmin(adminStatus === "true");
    if(loggedInStatus==="true" && userId){
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          setUserName(data.name); // Assuming the API returns { name: "User Name" }
          setInitials(getInitials(data.name)) 
          sessionStorage.setItem("user", JSON.stringify({"name": data.name, "email": data.email, "YDS": data.grade}))
        } catch (error) {
          console.error("Error fetching user details:", error);
          setUserName("Unknown");
        }
      };
    fetchUserData();
    }
  }, []);

  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');
  const handleLogoClick = () => navigate('/home');
  const handleDashboardClick = () => navigate('/admin');

  const handleLogOutClick = () => {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("sub");

    location.reload();
  };



  

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <img src="/src/assets/Img/Logo_nav.png" alt="nav-logo" className="logo-image" onClick={handleLogoClick} />
        </div>
        <ul className="link-container">
          {isLoggedIn ? (
            <>
              <li style={{ display: 'none' }}><button onClick={handleLoginClick} className="nav-button">Iniciar Sesión</button></li>
              <li style={{ display: 'none' }}><button onClick={handleRegisterClick} className="nav-button">Crear Cuenta</button></li>
              <li><button onClick={handleLogOutClick} className="nav-button">Cerrar Sesion</button></li>
              {isAdmin && (
                <li><button onClick={handleDashboardClick} className="nav-button">Dashboard</button></li>
                
              )}
              <li><button  className="nav-button">{userName}</button></li>
              <li><button className="user-circle">{initials}</button></li>
            </>
          ) : (
            <>
              <li><button onClick={handleLoginClick} className="nav-button">Iniciar Sesión</button></li>
              <li><button onClick={handleRegisterClick} className="nav-button">Crear Cuenta</button></li>
              <li style={{ display: 'none' }}><button onClick={handleLogOutClick} className="nav-button">Cerrar Sesion</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
