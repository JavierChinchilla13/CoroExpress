import { Route, Routes } from "react-router-dom";
import AddUser from "../pages/AddUser";
import Casillero from "../pages/Casillero";
import Pedidos from "../pages/Pedidos";
// import ProtectedRoute from "../../auth/components/ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* AddUser route */}
      <Route path="addUser" element={<AddUser />} />

      {/* Pedidos route */}
      <Route path="pedidos" element={<Pedidos />} />

      {/* Casillero route */}
      <Route path="casilleros" element={<Casillero />} />
    </Routes>
  );
};

export default AdminRoutes;
