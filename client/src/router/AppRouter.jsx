import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import TCURoutes from "../coro/routes/coroRoutes";
import { PrivateRoute } from "./PrivateRoute";
import AdminRoutes from "../coro/routes/AdminRoutes";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthRoutes />
            </PublicRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />

        <Route path="/*" element={<TCURoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
