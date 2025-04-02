import { useState } from "react";
import "./TrackingApp.css";

const API_KEY = "TU_API_KEY"; // Reemplaza con tu API Key de Airtable
const BASE_ID = "TU_BASE_ID"; // Reemplaza con el ID de la base
const TABLE_NAME = "TU_TABLE_ID"; // Reemplaza con el ID de la tabla
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

export default function TrackingApp() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [packageData, setPackageData] = useState(null);

  const handleSearch = async () => {
    if (!trackingNumber) {
      setMessage("Por favor ingresa un número de seguimiento.");
      return;
    }

    setMessage("Buscando...");

    try {
      const response = await fetch(
        `${AIRTABLE_URL}?filterByFormula=({numerotracking}='${trackingNumber}')`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.records.length > 0) {
        const record = data.records[0].fields;
        setPackageData(record);
        setProgress(getProgress(record["Estadodelpaquete"]));
      } else {
        setMessage("No se encontró el número de seguimiento.");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor." + error);
    }
  };

  const getProgress = (status) => {
    const progressMap = {
      "Pre alertado": 16.66,
      "Recibido en Miami": 33.32,
      "Procesando envío para Costa Rica": 49.98,
      "Procesando nacionalización de paquete en Costa Rica": 66.64,
      "Listo para entrega": 83.3,
      "Entregado a cliente": 100,
    };
    return progressMap[status] || 0;
  };

  return (
    <div className="tracking-container">
      <input
        type="text"
        placeholder="Ingresa el número de seguimiento"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Rastrear</button>
      <div className="result">
        {message && <p>{message}</p>}
        {packageData && (
          <div>
            <p>
              <strong>Cliente:</strong>{" "}
              {packageData.Customer || "No disponible"}
            </p>
            <p>
              <strong>Peso:</strong>{" "}
              {packageData.Pesodelpaquete || "No disponible"} lbs
            </p>
            <p>
              <strong>Estado:</strong> {packageData["Estadodelpaquete"]}
            </p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
