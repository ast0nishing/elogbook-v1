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

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: false,
    isAuthenticated: false,
    user: null,
    role: null,
  });
  // Authenticate user
  const loadUser = async () => {
    if (sessionStorage[SESSION_STORAGE_ACCESS_TOKEN_NAME]) {
      setAuthToken(sessionStorage[SESSION_STORAGE_ACCESS_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth/getUsername`);
      if (response.status == 200) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.username,
            role: sessionStorage["role"],
          },
        });
      }
      if (response.status !== 200) {
        try {
          const response = await axios.post(
            `${apiUrl}/auth/refresh-token`,
            sessionStorage[SESSION_STORAGE_REFRESH_TOKEN_NAME]
          );
          if (response.data.accessToken)
            dispatch({
              type: "SET_AUTH",
              payload: {
                isAuthenticated: true,
                user: response.data.user,
                role: sessionStorage["role"],
              },
            });
        } catch (error) {
          sessionStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN_NAME);
          setAuthToken(null);
          dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: false, user: null },
          });
        }
      }
    } catch (error) {
      sessionStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => loadUser(), []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.accessToken)
        sessionStorage.setItem(
          SESSION_STORAGE_ACCESS_TOKEN_NAME,
          response.data.accessToken
        );
      sessionStorage.setItem("role", userForm.role);
      sessionStorage.setItem(
        SESSION_STORAGE_REFRESH_TOKEN_NAME,
        response.data.refreshToken
      );
      const role = userForm.role;
      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        sessionStorage.setItem(
          SESSION_STORAGE_ACCESS_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    sessionStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
