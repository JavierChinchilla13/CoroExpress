import { useState, useRef, useEffect } from "react";
import Casillero from "./Casillero";

const DeseaCasillero = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  // Detectar clics fuera del formulario para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  return (
    <div className="flex flex-col justify-center items-center z10">
      {/* Se mantiene visible aunque el formulario esté abierto */}
      <div
        className={`w-full max-w-2xl mx-auto text-center p-10 transition-opacity duration-300 ${
          showForm ? "opacity-30" : "opacity-100"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">
          Comprar en línea nunca fue tan fácil:
        </h2>

        <ul className="text-black font-medium text-base leading-relaxed space-y-3 text-left mx-auto max-w-md mb-10">
          <li className="flex items-start gap-2">
            <span className="text-[#50B8D3] font-bold">•</span>
            Solicita nuestra dirección.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50B8D3] font-bold">•</span>
            Ingresa los datos tal cual aparecen en la página donde deseas
            comprar.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50B8D3] font-bold">•</span>
            Compra con nosotros y haz la pre alerta del paquete para darle
            seguimiento en tiempo real.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50B8D3] font-bold">•</span>
            Recibe tus compras en la comodidad de tu hogar.
          </li>
        </ul>

        <button
          className="px-6 py-3 bg-[#50B8D3] hover:bg-[#3EA9C1] text-white font-medium rounded-lg text-lg"
          onClick={() => setShowForm(true)}
        >
          Abrir casillero
        </button>
      </div>

      {/* Modal del formulario */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            ref={formRef}
            className="w-full max-w-lg bg-white rounded-lg shadow-lg"
          >
            <div className="relative z-10">
              <Casillero />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeseaCasillero;
