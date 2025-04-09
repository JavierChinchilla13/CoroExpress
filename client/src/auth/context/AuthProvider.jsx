import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/authTypes";
import PropTypes from "prop-types";

// Estado inicial del usuario, que indica que no está autenticado
const user = {
  logged: false,
};

/**
 * Inicializa el estado de autenticación al cargar el componente.
 * Intenta recuperar el estado del usuario autenticado desde el localStorage.
 * Si no hay datos, retorna `undefined`.
 * @returns {Object|null} - Estado del usuario desde el localStorage o `null`.
 */
const init = () => {
  return JSON.parse(localStorage.getItem("userAuth"));
};

/**
 * Proveedor de contexto para manejar la autenticación de usuarios.
 * @param {Object} children - Componentes hijos que tendrán acceso al contexto.
 */
export const AuthProvider = ({ children }) => {
  // Hook `useReducer` para manejar el estado de autenticación con el `authReducer`
  const [authState, dispatch] = useReducer(authReducer, user, init);

  /**
   * Maneja el inicio de sesión del usuario.
   * Guarda el estado del usuario autenticado en el localStorage y lo envía al reducer.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} token - Token de autenticación.
   */
  const login = (email, token) => {
    // Define la acción de inicio de sesión
    const action = {
      type: types.login,
      payload: {
        email,
      },
    };

    // Almacena los datos del usuario autenticado en el localStorage
    localStorage.setItem(
      "userAuth",
      JSON.stringify({
        logged: true,
        user: {
          email,
        },
      })
    );

    // Envía la acción al reducer para actualizar el estado
    dispatch(action);
  };

  /**
   * Maneja el cierre de sesión del usuario.
   * Limpia el estado del usuario en el localStorage y envía la acción al reducer.
   */
  const logout = () => {
    // Define la acción de cierre de sesión
    const action = {
      type: types.logout,
    };

    // Elimina los datos del usuario autenticado del localStorage
    localStorage.removeItem("userAuth");

    // Envía la acción al reducer para actualizar el estado
    dispatch(action);
  };

  // const [authState, setAuthState] = useState({
  //   logged: false,
  //   user: null,
  //   role: null, // Añade el rol aquí
  // });

  // const saveUser = (user) => {
  //   setAuthState({
  //     logged: true,
  //     user,
  //     role: user.role, // Asume que el backend devuelve el rol
  //   });
  //   setErrorMessage("");
  // };

  return (
    // Provee el contexto de autenticación con las funciones y el estado actual
    <AuthContext.Provider
      value={{
        authState, // Estado de autenticación actual
        login, // Función para iniciar sesión
        logout, // Función para cerrar sesión
      }}
    >
      {children} {/* Renderiza los componentes hijos */}
    </AuthContext.Provider>
  );
};

// Validación de tipos para las props del componente
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Se requiere al menos un nodo como hijo
};
