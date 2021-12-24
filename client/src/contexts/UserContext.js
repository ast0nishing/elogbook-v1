/** @format */
import api from "../utils/api";
import { createContext, useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import {
  apiUrl,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  UPDATE_USER,
} from "./constants";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // State
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
    userLoading: true,
  });
  //   Message return
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get the user information
  const getUser = async () => {
    try {
      const role = JSON.parse(sessionStorage["user"]).role;
      const url = `${apiUrl}/api/v1/${role}s`;
      const response = await api.get(url);
      if (response.status == 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIL });
    }
  };

  // Update user
  const updateUser = async (updatedUser) => {
    try {
      const role = JSON.parse(sessionStorage["user"]).role;
      const url = `${apiUrl}/api/v1/${role}s`;
      const response = await api.put(url, updatedUser);
      if (response.status == 200) {
        dispatch({ type: UPDATE_USER, payload: response.data });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  const changePassword = async (old_new_pw) => {
    try {
      const role = JSON.parse(sessionStorage["user"]).role;
      const url = `${apiUrl}/api/v1/${role}s/password`;
      const response = await api.put(url, old_new_pw);
      if (response.status == 200) {
        return { message: response.data.message };
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const userContextData = {
    getUser,
    updateUser,
    userState,
    showToast,
    setShowToast,
    changePassword,
  };

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
