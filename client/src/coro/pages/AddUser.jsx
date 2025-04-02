import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import axios from "axios";
import useLocalState from "../utils/localState";
import AdminList from "../components/shared/AdminList";
import Footer from "../components/Footer";

/**
 * Componente para agregar un nuevo usuario administrador.
 * Incluye un formulario para el registro y una lista de administradores existentes.
 */
const AddUser = () => {
  // Estado para manejar los datos del formulario
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Estado para refrescar la tabla de administradores
  const [refreshTable, setRefreshTable] = useState(false);

  // Desestructuración de funciones y estados del hook personalizado
  const { alert, showAlert, loading, setLoading, setSuccess, hideAlert } =
    useLocalState();

  /**
   * Maneja el cambio de valores en los campos del formulario.
   * @param {Object} e - Evento del input.
   */
  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  /**
   * Maneja el envío del formulario para registrar un nuevo administrador.
   * Realiza validaciones, envía datos al servidor, y actualiza la interfaz.
   * @param {Object} e - Evento del formulario.
   */
  const onRegisterUser = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    hideAlert(); // Oculta alertas previas
    setLoading(true); // Activa el estado de carga

    try {
      // Solicitud para registrar un nuevo usuario administrador
      const { data } = await axios.post(`/api/v1/auth/register`, formState);

      setSuccess(true); // Indica éxito en la operación
      setFormState({ name: "", email: "", password: "" }); // Limpia el formulario
      showAlert({ text: data.msg, type: "success" }); // Muestra mensaje de éxito

      // Refresca la tabla de administradores
      setRefreshTable((prev) => !prev);
    } catch (error) {
      // Manejo de errores al registrar el administrador
      const { msg } = error.response?.data || "Hubo un error.";
      showAlert({ text: msg, type: "error" });
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="grid min-h-screen pt-[150px]">
      <Header /> {/* Encabezado principal */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-center gap-8 p-8 bg-gray-50">
        {/* Sección del formulario */}
        <div className="w-fit h-fit lg:w-5/12 bg-white rounded-xl shadow-lg p-6 mt-12">
          <h1 className="text-xl font-bold text-gray-700 mb-4">
            Agregar administrador
          </h1>

          {/* Mostrar alerta si está activa */}
          {alert.show && (
            <div
              className={`p-4 mb-4 text-center rounded-lg ${
                alert.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {alert.text}
            </div>
          )}

          <form onSubmit={onRegisterUser} className="space-y-4">
            {/* Campos del formulario */}
            <Input
              text={formState.name}
              placeHolder="Nombre"
              extraStyle="w-full"
              nameRef="name"
              handleText={onInputChange}
            />
            <Input
              text={formState.email}
              placeHolder="Email"
              extraStyle="w-full"
              nameRef="email"
              handleText={onInputChange}
            />
            <Input
              text={formState.password}
              placeHolder="Contraseña"
              extraStyle="w-full"
              nameRef="password"
              handleText={onInputChange}
            />
            <Button
              extraStyle="w-full bg-blue-500 text-white py-2 rounded"
              type="submit"
              disabled={loading} // Deshabilitado mientras está en proceso
            >
              {loading ? "Cargando..." : "Registrar"}
            </Button>
          </form>
        </div>

        {/* Sección de la lista de administradores */}
        <div className="w-fit h-fit lg:w-6/12 bg-white rounded-xl shadow-lg p-6 mt-12">
          <h1 className="text-xl font-bold text-gray-700 mb-4">
            Lista de administradores
          </h1>
          <AdminList refreshTrigger={refreshTable} />
        </div>
      </div>
      <Footer /> {/* Pie de página */}
    </div>
  );
};

export default AddUser;
