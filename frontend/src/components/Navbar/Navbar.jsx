import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faImage, faCogs, faCog, faCamera, faGear } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [initials, setInitials] = useState('UK');
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); 
  const buttonRef = useRef(null); 
  const BASE_URL = 'https://ramoja-tours.up.railway.app';

  const getInitials = (name) => {
    if (!name) return 'UK';
    const words = name.split(' ');
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  };

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    const adminStatus = sessionStorage.getItem('isAdmin');
    const userId = sessionStorage.getItem('sub');

    setIsLoggedIn(loggedInStatus === 'true');
    setIsAdmin(adminStatus === 'true');
    if (loggedInStatus === 'true' && userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          setUserName(data.name);
          setInitials(getInitials(data.name));
          sessionStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, YDS: data.grade }));
        } catch (error) {
          console.error('Error fetching user details:', error);
          setUserName('Unknown');
        }
      };
      fetchUserData();
    }
  }, []);

  const handleLogOutClick = () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('sub');
    location.reload();
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleChangePhotoClick = () => {
    console.log('Funcionalidad para cambiar la foto.');
  };

  const handleSettingsClick = () => {
    console.log("Settings")
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside); 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container" onClick={()=>navigate("/home")}>
          <img src="/src/assets/Logo_nav.png" alt="nav-logo" className="logo-image" />
        </div>
        <ul className="link-container">
          {isLoggedIn ? (
            <>
              {isAdmin &&  
                     <li>
                     <button className="nav-button" onClick={()=>navigate("/admin")}> 
                       <FontAwesomeIcon icon={faGear}  /> Dashboard
                     </button>
                     </li>  
              }
              <li>
                <button className="nav-button"> 
                  <FontAwesomeIcon icon={faUser} /> {userName}
                </button>
                </li>
              <li>
                <button
                  className="user-circle"
                  ref={buttonRef} // Asocia el botón a la referencia
                  onClick={toggleMenu}
                >
                  {initials}
                </button>
                {showMenu && (
                  <div className="dropdown-menu" ref={menuRef}>
                    <button onClick={handleChangePhotoClick} className="menu-item">
                      <FontAwesomeIcon icon={faCamera} /> Cambiar Foto
                    </button>
                    <hr />
                    <button onClick={handleSettingsClick} className="menu-item">
                      <FontAwesomeIcon icon={faCog} /> Ajustes
                    </button>
                    <button onClick={handleLogOutClick} className="menu-item">
                      <FontAwesomeIcon icon={faSignOutAlt}/> Cerrar Sesión
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="nav-button" onClick={handleLoginClick}>Iniciar Sesión</button>
              </li>
              <li>
                <button className="nav-button" onClick={handleSignUpClick}>Crear Cuenta</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
