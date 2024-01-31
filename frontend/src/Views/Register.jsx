import { useState, useEffect } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { RiFacebookCircleFill, RiGoogleFill } from 'react-icons/ri';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { RegisterButton } from '../Components/Login/RegisterButton';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { useAuthStore } from '../stores/Auth/authStore';
import { AuthService } from '../services/authService';
import { GridLoader } from 'react-spinners';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const useSocialLogin = useAuthStore((state) => state.socialLogin);
  const useSocialRegister = useAuthStore((state) => state.socialRegister);

  const useRegister = useAuthStore((state) => state.register);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [textError, setTextError] = useState('');
  const [viewError, setViewError] = useState(false);

  const facebookAppId = import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID;

  const { instance } = useMsal();

  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log(error),
  });

  const text = 'Bienvenido a Niux';
  const typingSpeed = 100;

  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    const typingTimer = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayText((prevDisplayText) => prevDisplayText + text.charAt(charIndex));
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
      } else {
        clearInterval(typingTimer);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingTimer);
    };
  }, [charIndex]);

  // Login Google
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user) {
          setLoading(true);

          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          });

          const validateUser = await AuthService.socialUserAlreadyExists(response.data.email, response.data.id, 'google');
          if (!validateUser) {
            useSocialRegister(response.data.email, response.data.name, response.data.id, 'google', response.data.picture);
            setTimeout(() => {
              setLoading(false);
              navigate('/dashboard');
            }, 2000);
          } else {
            useSocialLogin(response.data.email, response.data.id, 'google');
            setTimeout(() => {
              setLoading(false);
              navigate('/dashboard');
            }, 2000);
          }
        }
      } catch (error) {
        setLoading(false);
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const getInfo = async () => {
    const currentAccount = instance.getActiveAccount();
    if (currentAccount) {
      const validateUser = await AuthService.socialUserAlreadyExists(currentAccount.username, currentAccount.homeAccountId, 'microsoft');
      if (!validateUser) {
        useSocialRegister(currentAccount.username, currentAccount.name, currentAccount.homeAccountId, 'microsoft');
        navigate('/dashboard');
      } else {
        useSocialLogin(currentAccount.username, currentAccount.homeAccountId, 'microsoft');
        navigate('/dashboard');
      }
    }
  };

  if (useIsAuthenticated()) {
    getInfo();
  }

  const validateEmail = (email) => {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword || !confirmPassword || !fullName) {
      setViewError(true);
      setTextError('Todos los campos son obligatorios');
      return;
    }

    if (!validateEmail(userEmail)) {
      setViewError(true);
      setTextError('Correo electrónico inválido');
      return;
    }

    if (!validatePassword(userPassword)) {
      setViewError(true);
      setTextError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número');
      return;
    }

    if (userPassword !== confirmPassword) {
      setViewError(true);
      setTextError('Las contraseñas no coinciden');
      return;
    }

    try {
      await useRegister(userEmail, fullName, userPassword);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setTextError('El correo electrónico ya está registrado');
      setViewError(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-tl-lg rounded-bl-lg p-4">
        <div className="my-8">
          <img src="../../public/Images/logo3niux.png" alt="Niux" width="100" height="100" />
        </div>
        <div className="flex flex-col items-center gap-8">
          <h1 className="typing-effect text-4xl font-bold text-gray-900 ">
            <i className="nf nf-md-hand_wave"> </i>
            {displayText}
            <span className="typing-cursor"></span>
          </h1>
          {/* Contenedor botones Login*/}
          <div className="flex flex-col gap-3">
            {/* Boton de Google */}

            <button onClick={() => login()} className="flex items-center gap-2 hover:bg-purple-400 hover:text-white transition-colors hover:border-purple-400 bg-gray-200 py-2 px-4 rounded-lg shadow-lg">
              <RiGoogleFill className="w-5 h-5" />
              Registrarse con Google
            </button>

            {/* Boton de Facebook */}
            <LoginSocialFacebook
              appId={facebookAppId}
              onResolve={async (response) => {
                try {
                  setLoading(true);

                  const pictureResponse = await axios.get(`https://graph.facebook.com/v18.0/${response.data.userID}/picture`);

                  const validateUser = await AuthService.socialUserAlreadyExists(response.data.email, response.data.id, 'facebook');
                  if (!validateUser) {
                    useSocialRegister(response.data.email, response.data.name, response.data.userID, 'facebook', pictureResponse.request.responseURL);
                    setTimeout(() => {
                      navigate('/dashboard');
                    }, 2000);
                  } else {
                    useSocialLogin(response.data.email, response.data.userID, 'facebook');
                    setTimeout(() => {
                      navigate('/dashboard');
                    }, 2000);
                  }
                } catch (error) {
                  setLoading(false);

                  console.error('Error al hacer la solicitud:', error);
                }
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <button className="flex items-center gap-2 hover:bg-purple-400 hover:text-white transition-colors hover:border-purple-400 bg-gray-200 py-2 px-4 rounded-lg shadow-lg">
                <RiFacebookCircleFill className="w-5 h-5" />
                Registrarse con Facebook
              </button>
            </LoginSocialFacebook>

            {/* Boton Microsoft */}

            {<RegisterButton />}
          </div>
        </div>
        <div className="my-14">
          <p className="text-center relative text-purple-400 font-bold bg-gray-100 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
            Ingresa tus datos
          </p>
        </div>

        <div className="w-full mb-8">
          {viewError ? (
            <p className="text-center relative text-red-400 font-bold bg-gray-100 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
              {textError}
            </p>
          ) : (
            ''
          )}
          <form onSubmit={onSubmit}>
            <div className="flex justify-center mb-4">
              <input value={fullName} onChange={(e) => (setFullName(e.target.value), setViewError(false))} type="nombre" className="w-full max-w-md py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400" placeholder="Nombre(s)" />
            </div>
            <div className="flex justify-center mb-4">
              <input value={userEmail} onChange={(e) => (setEmail(e.target.value), setViewError(false))} type="email" className="w-full max-w-md py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400" placeholder="Correo electrónico" />
            </div>
            <div className="flex justify-center mb-6">
              <input value={userPassword} onChange={(e) => (setPassword(e.target.value), setViewError(false))} type="password" className="w-full max-w-md py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400" placeholder="Contraseña" />
            </div>
            <div className="flex justify-center mb-6">
              <input value={confirmPassword} onChange={(e) => (setConfirmPassword(e.target.value), setViewError(false))} type="password" className="w-full max-w-md py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400" placeholder="Confirmar contraseña" />
            </div>
            <div className="w-full max-w-md mx-auto flex items-center text-gray-500 mb-8 justify-end"></div>
            <div className="w-full max-w-md mx-auto">
              <button type="submit" className="w-full font-poppins bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors">
                Registrarse
              </button>
            </div>
          </form>
          {loading && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
              }}
            >
              <GridLoader size={25} color="#b70df3" />
            </div>
          )}
        </div>
        <div>
          <span className="text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-bold text-gray-900 hover:underline hover:text-purple-600 transition-all">
              Iniciar sesión
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center border-t border-r border-b rounded-tr-lg rounded-br-lg">
        <img src="../../public/Images/login3.png" className="w-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
