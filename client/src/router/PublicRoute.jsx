import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({children}) => {

    const { authState } = useContext(AuthContext);

    //Si el usuario esta logeado no puede acceder a las pantallas de login y registro
    return (authState?.logged) ?
      <Navigate to='/'/>
     : children

}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired
}
