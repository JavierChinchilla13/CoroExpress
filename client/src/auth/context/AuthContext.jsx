import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Creación del contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado para manejar el estado de autenticación
  const [authState, setAuthState] = useState({ logged: false, user: null });

  // Estado para indicar si se está cargando información del usuario
  const [isLoading, setIsLoading] = useState(true);

  // Estado para almacenar mensajes de error
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Guarda los datos del usuario en el estado de autenticación.
   * @param {Object} user - Información del usuario autenticado.
   */
  const saveUser = (user) => {
    setAuthState({ logged: true, user }); // Actualiza el estado con el usuario autenticado
    setErrorMessage(""); // Limpia cualquier mensaje de error previo
  };

  /**
   * Elimina los datos del usuario del estado de autenticación.
   */
  const removeUser = () => {
    setAuthState({ logged: false, user: null }); // Resetea el estado de autenticación
  };

  /**
   * Obtiene los datos del usuario autenticado desde la API.
   */
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/showMe"); // Solicita los datos del usuario
      saveUser(data.user); // Guarda los datos del usuario en el estado
    } catch (error) {
      console.error("Error fetching user data:", error); // Loguea el error si ocurre
      removeUser(); // Resetea el estado si no se pueden obtener los datos del usuario
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  /**
   * Maneja el proceso de cierre de sesión del usuario.
   */
  const logout = async () => {
    try {
      await axios.delete("/api/v1/auth/logout"); // Realiza la solicitud de cierre de sesión
      removeUser(); // Resetea el estado de autenticación
    } catch (error) {
      console.error("Error during logout:", error); // Loguea el error si ocurre
    }
  };

  /**
   * Maneja el proceso de inicio de sesión del usuario.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      setAuthState({
        logged: true,
        user: response.data.user,
        role: response.data.user.role, // Asegúrate que el backend devuelva el rol
      });
    } catch (error) {
      // Maneja errores específicos y genéricos
      if (error.response && error.response.status === 401) {
        setErrorMessage("Correo o contraseña incorrectos."); // Mensaje de error para credenciales inválidas
      } else {
        setErrorMessage("Ocurrió un error inesperado. Intenta nuevamente."); // Mensaje de error genérico
      }
    }
  };

  // Efecto secundario para cargar los datos del usuario al iniciar el componente
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState, // Estado de autenticación actual
        logout, // Función para cerrar sesión
        login, // Función para iniciar sesión
        errorMessage, // Mensaje de error actual
      }}
    >
      {isLoading ? (
        <div>Loading...</div> // Muestra un mensaje de carga mientras se obtienen los datos
      ) : (
        children // Renderiza los componentes hijos si ya se cargaron los datos
      )}
    </AuthContext.Provider>
  );
};

// Validación de tipos para las props del componente
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Se requiere al menos un nodo como hijo
};
