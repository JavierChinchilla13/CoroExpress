// auth/context/RoleContext.js
import { createContext, useContext } from "react";
import PropTypes from "prop-types";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // const roles = {
  //   admin: {
  //     canCreateUsers: true,
  //     canEditSettings: true,
  //     canManageContent: true,
  //   },
  //   manager: {
  //     canCreateUsers: false,
  //     canEditSettings: false,
  //     canManageContent: true,
  //   },
  // };

  // const getRolePermissions = (role) => {
  //   return roles[role] || {};
  // };
  const isAdmin = (userRole) => {
    return userRole === "admin";
  };

  return (
    <RoleContext.Provider value={{ isAdmin }}>{children}</RoleContext.Provider>
  );
};

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useRole = () => useContext(RoleContext);
