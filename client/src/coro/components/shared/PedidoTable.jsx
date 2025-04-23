import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../auth/context/AuthContext"; // ajusta si es necesario

const AdminList = ({ refreshTrigger }) => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.role === "admin";

  const [pedidos, setPedidos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    number: "",
    store: "",
    tracking: "",
    direction: "",
    state: "tramite",
    peso: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/pedido");
      setPedidos(response.data.pedidos || []);
      setError(null);
    } catch (err) {
      setError("Error al obtener los pedidos. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (confirm("¿Estás seguro que deseas eliminar este pedido?")) {
      try {
        await axios.delete(`/api/v1/pedido/${id}`);
        setPedidos(pedidos.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        setError("No se pudo eliminar el pedido.");
      }
    }
  };

  const handleEdit = (pedido) => {
    setEditingId(pedido._id);
    setForm({
      fullName: pedido.fullName,
      number: pedido.number,
      store: pedido.store,
      tracking: pedido.tracking,
      direction: pedido.direction,
      state: pedido.state,
      peso: pedido.peso,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/api/v1/pedido/${id}`, form);
      setPedidos(
        pedidos.map((item) => (item._id === id ? { ...item, ...form } : item))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
      setError("No se pudo actualizar el pedido.");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, [refreshTrigger]);

  if (loading)
    return <div className="text-center text-gray-500">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (pedidos.length === 0)
    return (
      <div className="text-center text-gray-500">
        No hay pedidos registrados.
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
            <th className="px-4 py-2 border-b">Tienda</th>
            <th className="px-4 py-2 border-b text-center">Rastreo</th>
            <th className="px-4 py-2 border-b text-center">Entrega</th>
            <th className="px-4 py-2 border-b text-center">Estado</th>
            <th className="px-4 py-2 border-b text-center">Peso KG</th>
            <th className="px-4 py-2 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={pedido._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{pedido.fullName}</td>
              <td className="px-4 py-2">{pedido.number}</td>
              <td className="px-4 py-2">{pedido.store}</td>
              <td className="px-4 py-2">{pedido.tracking}</td>
              <td className="px-4 py-2">{pedido.direction}</td>

              <td className="px-4 py-2">
                {editingId === pedido._id ? (
                  <select
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className="border p-1 w-full"
                  >
                    <option value="tramite">En trámite</option>
                    <option value="miami">Entregado en Miami</option>
                    <option value="cr">En vuelo hacia CR</option>
                    <option value="aduanas">En aduanas</option>
                    <option value="listo">Listo para ser Entregado</option>
                    <option value="entregado">Entregado</option>
                  </select>
                ) : (
                  pedido.state
                )}
              </td>

              <td className="px-4 py-2">
                {editingId === pedido._id ? (
                  <input
                    type="number"
                    value={form.peso}
                    onChange={(e) => setForm({ ...form, peso: e.target.value })}
                    className="border p-1 w-20 text-center"
                    step="0.1"
                  />
                ) : (
                  pedido.peso
                )}
              </td>

              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  {editingId === pedido._id ? (
                    <>
                      <button
                        onClick={() => handleSave(pedido._id)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(pedido)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                      >
                        <FaEdit />
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(pedido._id)}
                          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

AdminList.propTypes = {
  refreshTrigger: PropTypes.bool.isRequired,
};

export default AdminList;
