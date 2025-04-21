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
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/casillero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.downloadUrl) {
          window.open(data.downloadUrl, "_blank");
        }

        const successText = `¡Hola ${fullName}! Casillero abierto exitosamente. Revisa tu correo para el PDF.`;

        toast.success(<div className="text-center">{successText}</div>, {
          position: "top-center",
        });

        setSuccessMessage(successText);

        setFormState({ fullName: "", number: "", email: "" });
        setErrorMessage("");
      } else {
        toast.error(data.message || "Error al procesar la solicitud");
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error de conexión con el servidor");
      setErrorMessage("No se pudo conectar con el servidor");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
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

        {successMessage && (
          <p className="text-green-600 text-sm mt-4">{successMessage}</p>
        )}

        <Button type="submit" extraStyle={buttonStyles} disabled={isLoading}>
          {isLoading ? "Procesando..." : "Abrir casillero"}
        </Button>

        {isLoading && (
          <p className="text-sm text-gray-500 animate-pulse">
            Cargando PDF y enviando información...
          </p>
        )}

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
