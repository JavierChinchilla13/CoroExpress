import { useState } from "react";
import axios from "axios";
import Input from "../shared/Input";
import Button from "../shared/Button";
import useLocalState from "../../utils/localState";

const AdminForm = ({ setRefreshTable }) => {
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
    <div className="w-fit h-fit lg:w-5/12 bg-white rounded-xl shadow-lg p-6 mt-12">
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
          type="submit"
          extraStyle="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Registrar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminForm;
