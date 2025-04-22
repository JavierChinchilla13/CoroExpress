import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import crFlag from "../../../assets/CR.png";
import logo from "../../../assets/logo.png";

const InicioP = () => {
  return (
    <div className="bg-gradient-to-b from-[#DFF0F6] via-[#E2F3F9] to-white py-10 px-4 flex flex-col items-center text-center space-y-4 rounded-2xl">
      {/* Texto superior */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
        Que la experiencia de comprar online no sea difícil.
      </h1>

      {/* Logo aún más grande */}
      <img
        src={logo}
        alt="Coro Express Logo"
        className="w-48 h-48 md:w-60 md:h-60 object-contain"
      />

      {/* Texto descriptivo */}
      <p className="text-lg md:text-2xl text-gray-700 max-w-2xl">
        Traemos todas tus compras desde cualquier parte del mundo hasta la
        puerta de tu casa
      </p>

      {/* Bandera debajo del texto */}
      <img
        src={crFlag}
        alt="Costa Rica Flag"
        className="w-10 h-6 md:w-14 md:h-8"
      />

      {/* Botón WhatsApp */}
      <div className="flex flex-col items-center mt-4">
        <a
          href="https://wa.me/50660372940?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20Coro%20Express%20y%20c%C3%B3mo%20funciona."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition"
        >
          <FaWhatsapp className="text-xl" />
          Para más información
        </a>
      </div>
    </div>
  );
};

export default InicioP;
