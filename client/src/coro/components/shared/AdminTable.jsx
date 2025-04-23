import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../auth/context/AuthContext";

const AdminTable = ({ refreshTrigger }) => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.role === "admin";

  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/v1/users");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [refreshTrigger]);

  const handleEdit = (user) => {
    if (!isAdmin) return;
    setEditing(user._id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleSave = async (id) => {
    if (!isAdmin) return;
    try {
      await axios.patch(`/api/v1/users/${id}`, form);
      setUsers((u) => u.map((x) => (x._id === id ? { ...x, ...form } : x)));
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      await axios.delete(`/api/v1/users/${id}`);
      setUsers((u) => u.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Cargando usuarios...</div>;

  return (
    <div className="overflow-x-auto p-6 mt-12 ">
      <h1 className="text-xl font-bold text-gray-700 mb-4">Usuarios</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Rol</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">
                {editing === user._id ? (
                  <input
                    className="border p-1 w-full"
                    value={form.name}
                    disabled={!isAdmin}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-2">
                {editing === user._id ? (
                  <input
                    className="border p-1 w-full"
                    value={form.email}
                    disabled={!isAdmin}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2">
                {editing === user._id ? (
                  <select
                    className="border p-1 w-full"
                    value={form.role}
                    disabled={!isAdmin}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, role: e.target.value }))
                    }
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
                  <>
                    <button
                      onClick={() => handleSave(user._id)}
                      disabled={!isAdmin}
                      className={`p-2 rounded ${
                        isAdmin
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="p-2 rounded bg-gray-300 text-black"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      disabled={!isAdmin}
                      className={`p-2 rounded ${
                        isAdmin
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={!isAdmin}
                      className={`p-2 rounded ${
                        isAdmin
                          ? "bg-red-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FaTrash />
                    </button>
                  </>
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
