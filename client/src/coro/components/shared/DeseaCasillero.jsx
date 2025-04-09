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
        <h2 className="text-3xl font-bold mb-6">¿Desea un casillero?</h2>

        <p className="text-black font-semibold mb-6 text-lg leading-relaxed">
          Información Información Información Información Información
          Información Información Información Información Información
          Información Información Información Información Información
          Información Información Información Información Información
          Información Información Información Información Información
        </p>

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
            className="w-full max-w-lg bg-white rounded-lg shadow-lg "
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
