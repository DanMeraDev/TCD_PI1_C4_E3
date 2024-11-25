import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import loginImage from '../../assets/Img/loginImage.jpg';
import loginImageResponsive from '../../assets/Img/loginImageResponsive.jpg';
import './LoginForm.css';
import { decodeToken, isTokenExpired } from '../../utils/functions/jwt';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [login, setLogin] =useState("");
  const apiUrl = "https://ramoja-tours.up.railway.app/auth/login"; 
  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!email.trim()) nuevosErrores.email = "El correo es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email))
      nuevosErrores.email = "El correo no es válido.";
    
    if (!password) nuevosErrores.password = "La contraseña es obligatoria.";
    else if (password.length < 6)
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres.";

    return nuevosErrores;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length === 0) {
      const dataToSend = { email, password };
      
      axios.post(apiUrl, dataToSend)
        .then((res) => {
          console.log(res.data);
          if(!isTokenExpired(res.data.token)){
            const userInfo = decodeToken(res.data.token)
            setLogin("True");
            //alert("Login exitoso!");
            sessionStorage.setItem("isAdmin", userInfo.isAdmin);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("sub", userInfo.sub);
            navigate('/home');
          }
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
          //alert("Credenciales invalidas, porfavor revise sus datos.");
          setLogin("False");
        });

    } else {
      setErrores(nuevosErrores);
    }
  };

  return (
    <div className='login'>
      <div className='columna1'>
        <div className='seccion1'>
          <img src={loginImageResponsive} alt="loginImageResponsive" className='imagenResponsive' /> 
          <h2><i className="fi fi-ss-user"></i> User Login</h2>
          <h6>Login to access your account</h6> 
          {login === "True" && <h6 className='mensajeLogin'>Login exitoso!</h6>}
          {login === "False" && <h6 className='mensajeLogin'>Credenciales invalidas, porfavor revise sus datos.</h6>}
        </div>

        <div className='seccion2'>
          <form className='formLogin' onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className='mailInput'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errores.email && <div className="error">{errores.email}</div>}

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className='passwordInput'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && <div className="error">{errores.password}</div>}

            <input type="submit" value="Login" className='loginButton' />
          </form>
        </div>
      </div>

      <div className='columna2'>
        <img src={loginImage} alt="loginImage" />
      </div>
    </div>
  );
};

export default LoginForm;
