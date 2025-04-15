import React, { useState } from "react";
import { toast } from "react-toastify";

const Calculadora = () => {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [costResult, setCostResult] = useState(null);

  const handleCalculate = () => {
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      toast.error("Ingresa un peso válido");
      setCostResult(null);
      return;
    }

    // Conversión a kilogramos si el usuario eligió libras
    const weightInKg = unit === "lb" ? parsedWeight * 0.453592 : parsedWeight;
    const cost = weightInKg * 12;

    setCostResult(cost.toFixed(2));
  };

  return (
    <div className="flex flex-col space-y-3">
      <h2 className="text-xl font-bold text-center mb-4">Calculadora</h2>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Peso del paquete"
        className="px-4 py-2 rounded-lg border border-gray-300"
      />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300"
      >
        <option value="kg">Kilogramos (kg)</option>
        <option value="lb">Libras (lb)</option>
      </select>
      <button
        onClick={handleCalculate}
        className="bg-[#46B2D5] text-white py-2 rounded-lg font-bold hover:bg-[#3CA0C0]"
      >
        Calcular costo
      </button>

      {costResult && (
        <p className="text-green-600 text-center mt-2">
          Costo estimado: <strong>${costResult}</strong>
        </p>
      )}
    </div>
  );
};

export default Calculadora;
