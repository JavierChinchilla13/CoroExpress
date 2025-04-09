import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";

const Casillero = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    number: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const containerStyles = "flex flex-col items-center";
  const textBoxStyles = "w-4/6 mt-4";
  const buttonStyles =
    "mt-6 mb-6 bg-[#50B8D3] hover:bg-[#3EA9C1] text-white font-medium";

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" && !/^\d*$/.test(value)) return;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, number, email } = formState;
    if (!fullName || !number || !email) {
      toast.error("Todos los campos son obligatorios");
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("/api/v1/casillero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        toast.success(
          "Se ha enviado la información del casillero al correo electrónico."
        );
        setFormState({ fullName: "", number: "", email: "" });
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        const serverMessage = errorData.message || "Error al abrir casillero.";
        setErrorMessage(serverMessage);
        toast.error(serverMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Hubo un problema, intenta nuevamente.");
      toast.error("Error en el servidor");
    }
  };

  return (
    <div className="w-full max-w-[600px] p-8 rounded-lg shadow-lg bg-white mx-auto relative z-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Casillero
      </h1>

      <form onSubmit={handleSubmit} className={containerStyles}>
        <Input
          text={formState.fullName}
          nameRef="fullName"
          handleText={onInputChange}
          placeHolder="Nombre Completo"
          extraStyle={textBoxStyles}
        />

        <Input
          text={formState.number}
          nameRef="number"
          handleText={onInputChange}
          type="tel"
          placeHolder="Número de teléfono"
          extraStyle={textBoxStyles}
        />

        <Input
          text={formState.email}
          nameRef="email"
          handleText={onInputChange}
          placeHolder="Correo"
          extraStyle={textBoxStyles}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <Button type="submit" extraStyle={buttonStyles}>
          Abrir casillero
        </Button>

        <p>
          <span className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer">
            Necesito dirección residencial
          </span>
        </p>
      </form>
    </div>
  );
};

export default Casillero;
