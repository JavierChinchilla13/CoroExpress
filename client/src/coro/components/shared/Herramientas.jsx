import React, { useState } from "react";
import { toast } from "react-toastify";
import Rastreador from "./TrackingSearch";
import Calculadora from "./Calculadora";

const Herramientas = () => {
  const [activeTab, setActiveTab] = useState("prealerta");
  const [formData, setFormData] = useState({
    fullName: "",
    number: "",
    store: "",
    tracking: "",
    direction: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage(""); // Limpiar al cambiar input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, number, store, tracking, direction } = formData;

    if (!fullName || !number || !store || !tracking || !direction) {
      setErrorMessage("Por favor, completa todos los campos.");
      setSuccessMessage("");
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("/api/v1/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Prealerta enviada correctamente");
        setFormData({
          fullName: "",
          number: "",
          store: "",
          tracking: "",
          direction: "",
        });
        setErrorMessage("");
        setSuccessMessage("¡Prealerta realizada correctamente!");
      } else {
        const error = await response.json();
        setSuccessMessage("");
        toast.error(error.message || "Error al enviar prealerta");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("");
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      {/* Navegación */}
      <div className="flex space-x-4 mb-6">
        {["prealerta", "rastrear", "calculadora"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-lg font-bold shadow-md ${
              activeTab === tab
                ? "bg-[#46B2D5] text-white"
                : "bg-[#E2F3F9] text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "prealerta"
              ? "Pre alertar"
              : tab === "rastrear"
              ? "Rastrear"
              : "Calculadora"}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="bg-[#E2F3F9] p-6 rounded-xl shadow-md w-80">
        {activeTab === "prealerta" && (
          <>
            <h2 className="text-xl font-bold text-center mb-4">
              Auto servicio
            </h2>
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                type="text"
                placeholder="Nombre completo"
                className="px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                type="tel"
                placeholder="Número de teléfono"
                className="px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                name="store"
                value={formData.store}
                onChange={handleInputChange}
                type="text"
                placeholder="Lugar de compra"
                className="px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                name="tracking"
                value={formData.tracking}
                onChange={handleInputChange}
                type="text"
                placeholder="Número de rastreo"
                className="px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                name="direction"
                value={formData.direction}
                onChange={handleInputChange}
                type="text"
                placeholder="Lugar de entrega"
                className="px-4 py-2 rounded-lg border border-gray-300"
              />

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="bg-[#46B2D5] text-white py-2 rounded-lg font-bold mt-2 hover:bg-[#3CA0C0]"
              >
                Enviar prealerta
              </button>
              {successMessage && (
                <p className="text-green-600 text-sm text-center mt-2">
                  {successMessage}
                </p>
              )}
            </form>
          </>
        )}

        {activeTab === "rastrear" && <Rastreador />}

        {activeTab === "calculadora" && <Calculadora />}
      </div>
    </div>
  );
};

export default Herramientas;
