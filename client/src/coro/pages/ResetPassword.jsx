import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import FormRow from "../components/shared/FormRow";
import useLocalState from "../utils/localState";
import Button from "../components/shared/Button";

/**
 * Hook para manejar los parámetros de consulta en la URL.
 * @returns {URLSearchParams} Instancia de URLSearchParams.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Componente para manejar el formulario de restablecimiento de contraseña.
 * Permite al usuario establecer una nueva contraseña usando un token recibido por correo.
 */
const ResetPasswordForm = () => {
  const navigate = useNavigate(); // Hook para redireccionar
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const { alert, showAlert, loading, setLoading, success, setSuccess } =
    useLocalState(); // Hook personalizado para manejo de estado local

  const query = useQuery(); // Obtiene los parámetros de consulta

  // Extrae el token y el email de los parámetros de consulta
  const token = query.get("token");
  const email = query.get("email");

  // Efecto para realizar acciones al cargar los parámetros
  useEffect(() => {
    console.log("Token recibido:", token);
    console.log("Email recibido:", email);
  }, [token, email]);

  /**
   * Maneja el cambio en el campo de la contraseña.
   * @param {Object} e - Evento del input.
   */
  const handleChange = (e) => {
    setPassword(e.target.value);
    console.log("Valor actualizado de la contraseña:", e.target.value);
  };

  /**
   * Maneja el envío del formulario para restablecer la contraseña.
   * Valida los datos y realiza la solicitud al servidor.
   * @param {Object} e - Evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    setLoading(true); // Activa el estado de carga

    console.log("Password al enviar:", password); // Para pruebas

    if (!password) {
      showAlert({ text: "Por favor, ingrese una contraseña" });
      setLoading(false);
      return;
    }

    try {
      // Solicitud al endpoint para restablecer contraseña
      const response = await axios.post("/api/v1/auth/reset-password", {
        password,
        token,
        email,
      });
      console.log("Respuesta del servidor:", response.data);

      setSuccess(true); // Indica éxito en la operación
      showAlert({
        text: "Éxito, redirigiendo a la página de inicio de sesión en breve",
        type: "success",
      });

      // Redirecciona después de 3 segundos
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      // Manejo de errores en la solicitud
      const errorMessage =
        error.response?.data?.msg || "Ocurrió un error inesperado";
      console.error("Error al enviar la solicitud:", error);
      showAlert({ text: errorMessage });
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-r bg-[#B0DEE9]"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Mostrar alerta si está activa */}
        {alert.show && (
          <div
            className={`alert alert-${
              alert.type
            } mb-4 p-4 text-center rounded-lg ${
              alert.type === "error"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {alert.text}
          </div>
        )}
        {!success && (
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl font-semibold text-center mb-4">
              Restablecer Contraseña
            </h4>
            {/* Campo de contraseña */}
            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
            />

            {/* Botón de envío */}
            <Button type="submit" extraStyle={"w-full"} disabled={loading}>
              {loading ? "Por favor, espere..." : "Nueva contraseña"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
