import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({children}) => {
  
    const { authState } = useContext(AuthContext);

    //Si el usuario no esta logeado no puede acceder 
    return (!authState?.logged) ?
      <Navigate to='/'/>
     : children


}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}