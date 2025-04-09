import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const AdminTable = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/v1/users");
        setUsers(res.data?.users || []);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [refreshTrigger]);

  const handleEdit = (user) => {
    setEditing(user._id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/api/v1/users/${id}`, form);
      setUsers(
        users.map((user) => (user._id === id ? { ...user, ...form } : user))
      );
      setEditing(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro que deseas eliminar este usuario?")) {
      try {
        await axios.delete(`/api/v1/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="w-fit h-fit lg:w-6/12 bg-white rounded-xl shadow-lg p-6 mt-12">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        Lista de usuarios
      </h1>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Rol</th>
            <th className="text-center p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">
                {editing === user._id ? (
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-1 w-full"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-2">
                {editing === user._id ? (
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2">
                {editing === user._id ? (
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="border p-1 w-full"
                  >
                    <option value="manager">Manager</option>
                    <option value="admin">Administrador</option>
                  </select>
                ) : user.role === "admin" ? (
                  "Administrador"
                ) : (
                  "Manager"
                )}
              </td>
              <td className="p-2 text-center">
                {editing === user._id ? (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleSave(user._id)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
