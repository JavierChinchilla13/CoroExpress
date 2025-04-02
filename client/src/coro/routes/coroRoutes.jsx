import { Route, Routes } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import ResetPassword from "../pages/ResetPassword";
import Verify from "../pages/Verify";

const CoroRoutes = () => {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/*" element={<AboutUs />} />

      <Route path="/user/reset-password" element={<ResetPassword />} />

      <Route path="/user/verify-email" element={<Verify />} />
    </Routes>
  );
};

export default CoroRoutes;
