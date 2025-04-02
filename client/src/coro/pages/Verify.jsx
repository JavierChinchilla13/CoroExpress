import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

/**
 * Hook para manejar los parámetros de consulta en la URL.
 * @returns {URLSearchParams} Instancia de URLSearchParams.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Componente para verificar el token de confirmación de correo electrónico.
 * Maneja el estado de carga, error y éxito durante el proceso de verificación.
 */
const VerifyPage = () => {
  const [error, setError] = useState(false); // Estado para errores en la verificación
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
  const [success, setSuccess] = useState(false); // Estado para indicar éxito en la verificación
  const query = useQuery(); // Obtiene los parámetros de consulta

  /**
   * Función para verificar el token de confirmación de correo electrónico.
   * Realiza una solicitud al servidor usando el token y el email de los parámetros.
   */
  const verifyToken = async () => {
    setLoading(true); // Inicia el estado de carga
    try {
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
      setSuccess(true); // Indica éxito en la verificación
    } catch (error) {
      console.error("Error verifying token:", error); // Log del error
      setError(true); // Activa el estado de error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Efecto para ejecutar la verificación al montar el componente
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-r bg-[#B0DEE9]"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Indicador de carga */}
        {loading && (
          <div className="bg-blue-100 text-blue-600 p-4 text-center rounded-lg">
            <h2 className="text-lg font-semibold">Cargando...</h2>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 text-center rounded-lg">
            <h4 className="text-lg">
              Hubo un error, por favor verifica el enlace.
            </h4>
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <>
            <h2 className="text-2xl font-semibold text-green-600 text-center mb-4">
              Cuenta confirmada
            </h2>
            <Link
              to="/auth/login"
              className="w-full bg-green-500 text-white py-2 px-4 rounded text-center block"
            >
              Inicia sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
