import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AdminList = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/users");
      setUsers(response.data.users || []);
      setError(null);
    } catch (err) {
      setError("Error al obtener los usuarios." + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  if (loading)
    return <div className="text-center text-gray-500">Cargando...</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (users.length === 0)
    return (
      <div className="text-center text-gray-500">
        No hay administradores registrados.
      </div>
    );

  return (

    <>
        <div className="overflow-x-auto">

      


          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Correo Electrónico</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>



        </div>
    </>


    
  );
};

AdminList.propTypes = {
  refreshTrigger: PropTypes.bool.isRequired,
};

export default AdminList;
