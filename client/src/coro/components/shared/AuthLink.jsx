import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AuthLink = () => {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);

  const handleAuthAction = () => {
    if (authState?.logged) {
      logout();
      navigate("/", { replace: true }); // Redirige al inicio limpiando el historial
    } else {
      navigate("/auth/login", { state: { from: location.pathname } }); // Guarda la ubicación actual
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
      {authState?.logged ? (
        <button
          onClick={handleAuthAction}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Cerrar sesión"
        >
          LogOut
        </button>
      ) : (
        <Link
          to="/auth/login"
          state={{ from: location.pathname }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Iniciar sesión"
        >
          LogIn
        </Link>
      )}
    </div>
  );
};

export default AuthLink;
