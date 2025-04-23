import { AuthContext } from "./AuthContext";
// import { authReducer } from "./authReducer";
// import { types } from "../types/authTypes";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

// // Estado inicial del usuario, que indica que no está autenticado
// const user = {
//   logged: false,
// };

// /**
//  * Inicializa el estado de autenticación al cargar el componente.
//  * Intenta recuperar el estado del usuario autenticado desde el localStorage.
//  * Si no hay datos, retorna `undefined`.
//  * @returns {Object|null} - Estado del usuario desde el localStorage o `null`.
//  */
// const init = () => {
//   return JSON.parse(localStorage.getItem("userAuth"));
// };

/**
 * Proveedor de contexto para manejar la autenticación de usuarios.
 * @param {Object} children - Componentes hijos que tendrán acceso al contexto.
 */
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    logged: false,
    user: null,
    role: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Guarda los datos del usuario y su role
  const saveUser = (user) => {
    setAuthState({
      logged: true,
      user,
      role: user.role ?? null,
    });
    setErrorMessage("");
  };

  const removeUser = () => {
    setAuthState({
      logged: false,
      user: null,
      role: null,
    });
  };

  // Trae el “yo” desde el backend
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/showMe");
      console.log("fetchUser, data.user:", data.user);
      saveUser(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      removeUser();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.delete("/api/v1/auth/logout");
      removeUser();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Login ahora reutiliza saveUser
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log("LOGIN OK, user:", response.data.user);

      saveUser(response.data.user);
      +(
        // refresca el estado desde el backend (cookie, rol, etc.)
        (+(await fetchUser()))
      );
    } catch (error) {
      // Si el servidor devolvió un body con explicación, lo imprimimos
      if (error.response) {
        console.error("LOGIN ERROR status:", error.response.status);
        console.error("LOGIN ERROR data:", error.response.data);
      } else {
        console.error("LOGIN ERROR no response:", error);
      }

      if (error.response?.status === 401) {
        setErrorMessage("Correo o contraseña incorrectos.");
      } else {
        setErrorMessage("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    // Provee el contexto de autenticación con las funciones y el estado actual
    <AuthContext.Provider value={{ authState, login, logout, errorMessage }}>
      {isLoading ? <div>Loading... </div> : children}
    </AuthContext.Provider>
  );
};

// Validación de tipos para las props del componente
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Se requiere al menos un nodo como hijo
};
