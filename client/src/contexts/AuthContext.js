/** @format */

import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import {
  apiUrl,
  SESSION_STORAGE_ACCESS_TOKEN_NAME,
  SESSION_STORAGE_REFRESH_TOKEN_NAME,
} from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import TokenService from "../utils/token.service";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: false,
    authLoading: false,
    isAuthenticated: false,
    user: null,
    role: null,
  });

  // Login
  const loginUser = async (userForm) => {
    const response = await axios.post(`${apiUrl}/auth/login`, userForm);
    if (response.status == 200) {
      var obj = response.data;
      obj.role = userForm.role;
      TokenService.setUser(obj);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: true,
          user: response.data.username,
          role: JSON.parse(sessionStorage["user"]).role,
        },
      });
    }
    return response.data;
  };

  // Logout
  const logoutUser = () => {
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    TokenService.removeUser();
  };
  // Get currrent user
  const loadUser = () => {
    return TokenService.getUser();
  };
  // Context data
  const authContextData = {
    loginUser,
    logoutUser,
    authState,
    loadUser,
  };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
