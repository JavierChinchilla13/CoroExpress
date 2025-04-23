import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../auth/context/AuthContext"; // Ajusta la ruta según tu estructura

const CasilleroTable = ({ refreshTrigger }) => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.user?.role === "admin";

  const [casilleros, setCasilleros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCasilleros = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/casillero");
      setCasilleros(response.data.casilleros || []);
      setError(null);
    } catch (err) {
      setError("Error al obtener los casilleros. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (confirm("¿Estás seguro que deseas eliminar este casillero?")) {
      try {
        await axios.delete(`/api/v1/casillero/${id}`);
        setCasilleros(casilleros.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error al eliminar el casillero:", error);
        setError("No se pudo eliminar el casillero.");
      }
    }
  };

  useEffect(() => {
    fetchCasilleros();
  }, [refreshTrigger]);

  if (loading)
    return <div className="text-center text-gray-500">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (casilleros.length === 0)
    return (
      <div className="text-center text-gray-500">
        No hay casilleros registrados.
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">Nombre Completo</th>
            <th className="px-4 py-2 border-b">Teléfono</th>
            <th className="px-4 py-2 border-b">Correo Electrónico</th>
            {isAdmin && (
              <th className="px-4 py-2 border-b text-center">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {casilleros.map((user, index) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2">{user.number}</td>
              <td className="px-4 py-2">{user.email}</td>
              {isAdmin && (
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CasilleroTable.propTypes = {
  refreshTrigger: PropTypes.bool.isRequired,
};

export default CasilleroTable;
