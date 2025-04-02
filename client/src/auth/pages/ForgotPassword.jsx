import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../../coro/components/shared/Button";

/**
 * Componente para la funcionalidad de recuperación de contraseña.
 * Permite a los usuarios solicitar un enlace para restablecer su contraseña.
 */
const ForgotPassword = () => {
  // Estado para el correo electrónico ingresado por el usuario
  const [email, setEmail] = useState("");

  // Estado para mostrar alertas, incluyendo el texto y el tipo de alerta
  const [alert, setAlert] = useState({ show: false, text: "", type: "" });

  // Estado para indicar si la solicitud está en proceso
  const [loading, setLoading] = useState(false);

  // Estado para determinar si la operación fue exitosa
  const [success, setSuccess] = useState(false);

  const buttonStyles =
    "mt-6 mb-6 bg-[#50B8D3] hover:bg-[#3EA9C1] text-white font-medium w-full";

  /**
   * Muestra una alerta con la información especificada.
   * @param {Object} alertData - Datos de la alerta (texto y tipo).
   */
  const showAlert = (alertData) => {
    setAlert({ show: true, ...alertData });
  };

  /**
   * Oculta la alerta activa.
   */
  const hideAlert = () => {
    setAlert({ show: false, text: "", type: "" });
  };

  /**
   * Maneja el cambio de texto en el campo de correo electrónico.
   * @param {Object} e - Evento del input.
   */
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Maneja el envío del formulario para solicitar un enlace de recuperación.
   * Realiza validaciones y envía la solicitud al servidor.
   * @param {Object} e - Evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    setLoading(true); // Activa el estado de carga
    hideAlert(); // Oculta cualquier alerta previa

    // Validación: el campo de correo no debe estar vacío
    if (!email) {
      showAlert({
        text: "Por favor proporcione un correo electrónico",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      // Solicitud al endpoint de recuperación de contraseña
      const { data } = await axios.post("/api/v1/auth/forgot-password", {
        email,
      });

      // Muestra un mensaje de éxito si la solicitud fue exitosa
      showAlert({ text: data.msg, type: "completado" });
      setSuccess(true);
    } catch (error) {
      // Muestra un mensaje de error si la solicitud falla
      showAlert({
        text: error.response?.data?.msg || "Algo salió mal, inténtelo de nuevo",
        type: "error",
      });
      setSuccess(false);
    }

    setLoading(false); // Desactiva el estado de carga
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-r bg-[#50B8D3]"
    >
      <div className="min-h-[600px] flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8">
          {/* Mostrar alertas si están activas */}
          {alert.show && (
            <div
              className={`text-center p-4 rounded-lg bg-${
                alert.type === "completado" ? "green" : "red"
              }-100 text-${alert.type === "completado" ? "green" : "red"}-700`}
            >
              {alert.text}
            </div>
          )}

          {/* Mostrar formulario si no se ha completado el proceso */}
          {!success && (
            <form
              className={`space-y-8 ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <h4 className="text-3xl font-bold text-center text-gray-800">
                Recuperar Contraseña
              </h4>

              {/* Campo de correo electrónico */}
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  placeholder="Digite su email"
                />
              </div>

              {/* Botón para enviar el formulario */}
              <Button
                type="submit"
                extraStyle={buttonStyles}
                disabled={loading} // Deshabilitado mientras está cargando
              >
                {loading ? "Porfavor Espere..." : "Obtener link"}
              </Button>

              {/* Enlace para volver al inicio de sesión */}
              <p className="text-center text-gray-600 text-lg">
                ¿Ya tiene cuenta?{" "}
                <Link
                  to="../login"
                  className="text-blue-500 hover:underline ml-1"
                >
                  Iniciar sesión
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
