// Importamos React y el hook useState para manejar el estado
import React, { useState } from "react";
// Importamos la librería de notificaciones
import { toast } from "react-toastify";
// Importamos íconos desde react-icons
import {
  FaBullhorn,
  FaWarehouse,
  FaPlane,
  FaUserTie,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

// Definimos los estados posibles del paquete con íconos y etiquetas
const estados = [
  { key: "tramite", label: "En trámite", icon: <FaBullhorn /> },
  { key: "miami", label: "Recibido en Miami", icon: <FaWarehouse /> },
  { key: "cr", label: "Enviado a CR", icon: <FaPlane /> },
  { key: "aduanas", label: "En aduanas", icon: <FaUserTie /> },
  { key: "listo", label: "Listo para entrega", icon: <FaTruck /> },
  { key: "entregado", label: "Entregado al cliente", icon: <FaCheckCircle /> },
];

// Componente principal del rastreador
const Rastreador = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [record, setRecord] = useState(null);
  const [cargando, setCargando] = useState(false);

  const buscarPaquete = async () => {
    if (!trackingNumber) {
      toast.error("Ingresa un número de rastreo");
      return;
    }

    try {
      setCargando(true);
      const response = await fetch(`/api/v1/pedido/${trackingNumber}`);
      const data = await response.json();

      if (!data.pedido) {
        toast.error("Paquete no encontrado");
        setRecord(null);
        return;
      }

      setRecord(data.pedido);
    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  const estadoActual = record?.state;
  const estadoIndex = estados.findIndex((e) => e.key === estadoActual);
  const progreso = ((estadoIndex + 1) / estados.length) * 100;

  const calcularTotal = (pesoKg) => {
    if (!pesoKg) return null;
    const total = pesoKg * 12;
    return total.toLocaleString("es-CR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <input
        type="text"
        placeholder="Número de rastreo"
        className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />

      <button
        onClick={buscarPaquete}
        className="bg-[#46B2D5] text-white px-6 py-2 rounded-lg hover:bg-[#3CA0C0] w-full max-w-md"
      >
        {cargando ? "Buscando..." : "Rastrear"}
      </button>

      {record && (
        <div className="w-full max-w-xl mt-6 space-y-4">
          <div className="text-center font-semibold text-lg">
            Estado actual: {estadoActual}
          </div>

          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="bg-[#00ffd1] h-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-700">
            {estados.map((estado, idx) => (
              <div
                key={estado.key}
                className="flex flex-col items-center w-full text-center"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-white text-xs ${
                    idx <= estadoIndex ? "bg-[#00ffd1]" : "bg-gray-300"
                  }`}
                >
                  {estado.icon}
                </div>
                <span>{estado.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border p-4 rounded-lg shadow space-y-2 text-sm">
            <div>
              <strong>Cliente:</strong> {record.fullName || "No disponible"}
            </div>
            <div>
              <strong>Peso:</strong>{" "}
              {record.peso ? `${record.peso} kg` : "No disponible"}
            </div>

            {record.peso && (
              <>
                <div>
                  <strong>Total a pagar:</strong> {calcularTotal(record.peso)}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rastreador;
