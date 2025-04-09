// // src/auth/components/ProtectedRoute.js
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { authState } = useAuth();

//   if (!authState.logged) {
//     return <Navigate to="/" replace />;
//   }

//   if (requiredRole && authState.role !== requiredRole) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
