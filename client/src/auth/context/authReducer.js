import { types } from "../types/authTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state, // por si más adelante tienes otros flags
        logged: true,
        user: action.payload, // payload es todo el objeto user { email, role, … }
        role: action.payload.role,
      };

    case types.logout:
      return {
        ...state,
        logged: false,
        user: null,
        role: null,
      };

    default:
      return state;
  }
};
