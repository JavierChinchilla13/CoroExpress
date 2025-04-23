import { useState, useContext } from "react";
import axios from "axios";
import Input from "../shared/Input";
import Button from "../shared/Button";
import useLocalState from "../../utils/localState";
import { AuthContext } from "../../../auth/context/AuthContext"; // ajusta ruta

const AdminForm = ({ setRefreshTable }) => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.role === "admin";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { alert, showAlert, loading, setLoading, setSuccess, hideAlert } =
    useLocalState();

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onRegisterUser = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    hideAlert();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/v1/auth/register", formState);
      showAlert({ text: data.msg, type: "success" });
      setFormState({ name: "", email: "", password: "" });
      setSuccess(true);
      setRefreshTable((prev) => !prev);
    } catch (error) {
      const { msg } = error.response?.data || "Hubo un error.";
      showAlert({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-fit h-fit lg:w-5/12 bg-white rounded-xl shadow-lg p-6 mt-12 relative">
      {!isAdmin && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
          <span className="text-gray-500">Sólo administradores</span>
        </div>
      )}

      <h1 className="text-xl font-bold text-gray-700 mb-4">
        Agregar administrador
      </h1>

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
        <Input
          text={formState.name}
          placeHolder="Nombre"
          extraStyle="w-full"
          nameRef="name"
          handleText={onInputChange}
          disabled={!isAdmin}
        />
        <Input
          text={formState.email}
          placeHolder="Email"
          extraStyle="w-full"
          nameRef="email"
          handleText={onInputChange}
          disabled={!isAdmin}
        />
        <Input
          text={formState.password}
          placeHolder="Contraseña"
          extraStyle="w-full"
          nameRef="password"
          handleText={onInputChange}
          disabled={!isAdmin}
        />
        <Button
          type="submit"
          extraStyle={`w-full py-2 rounded ${
            isAdmin
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isAdmin || loading}
        >
          {loading ? "Cargando..." : "Registrar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminForm;
