import React from 'react';
import './footer.css';
import logoFooter from '../../assets/Img/logoFooter.png';

const Footer = () => {
  return (
    <footer>
        
          <div className="logoFooter">
              <p className='imgLogo'><img src={logoFooter} alt="page-logo" style={{ maxHeight: '5vh' }} /></p>
              <p className='copyright'>© 2024 La Ramoja</p>
          </div>

          <div className="redes">
                  <p className='instagram'><a href="https://www.instagram.com"><i className="fi fi-brands-instagram"></i></a></p>
                  <p className='facebook'><a href="https://www.facebook.com"><i className="fi fi-brands-facebook"></i></a></p>
                  <p className='whatsapp'><a href="https://wa.me/0002223344"><i className="fi fi-brands-whatsapp"></i></a></p>
          </div>
        
    </footer>
  )
}

export default Footer

