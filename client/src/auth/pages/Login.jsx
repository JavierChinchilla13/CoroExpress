import { Link, useNavigate } from "react-router-dom";
import Button from "../../coro/components/shared/Button";
import Input from "../../coro/components/shared/Input";
import { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estilos actualizados
  const containerStyles = "flex flex-col items-center h-42";
  const textBoxStyles = "w-4/6 mt-4";
  const buttonStyles =
    "mt-6 mb-6 bg-[#50B8D3] hover:bg-[#3EA9C1] text-white font-medium";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Es necesario el email y contraseña");
      setErrorMessage("Es necesario el email y contraseña.");
      return;
    }

    const user = { email, password };

    try {
      const url = "/api/v1/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        login(email);
        navigate("/");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        toast.success("Inicio de sesión exitoso");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Correo o contraseña incorrectos."
        );
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage(
        "Ocurrió un error durante el proceso. Intenta nuevamente."
      );
      toast.error("Error en el servidor");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#50B8D3]">
      {/* Contenedor del formulario con sombra negra */}
      <div className="w-full max-w-[600px] p-8 rounded-lg shadow-lg bg-white">
        {/* Sección del logo */}
        <div className="flex items-center">
          <Link to="../../newClinic/pages/AboutUs">
            <img
              src={logo}
              alt="Logo de New Clinic"
              className="hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4 ml-16"
            />
          </Link>
        </div>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={onSubmit} className={containerStyles}>
          <Input
            text={email}
            nameRef="email"
            handleText={(e) => setEmail(e.target.value.toLowerCase())}
            placeHolder="Email"
            extraStyle={textBoxStyles}
          />

          <Input
            text={password}
            nameRef="password"
            handleText={(e) => setPassword(e.target.value)}
            type="password"
            placeHolder="Contraseña"
            extraStyle={textBoxStyles}
          />

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Botón con color #50B8D3 */}
          <Button type="submit" extraStyle={buttonStyles}>
            Iniciar sesión como colaborador
          </Button>

          <p>
            <Link
              to="../forgot-password"
              className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
