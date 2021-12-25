/** @format */
import api from "../utils/api";
import { createContext, useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import { useHistory } from "react-router";
import {
  apiUrl,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  UPDATE_USER,
} from "./constants";
import { message } from "antd";

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
      // const role = JSON.parse(sessionStorage["user"]).role;
      const url = `${apiUrl}/auth/change-password`;
      const response = await api.post(url, old_new_pw);
      if (response.status == 200) {
        return { message: response.data.msg };
      }
    } catch (error) {
      return { message: error.response.data.msg };
    }
  };
  const history = useHistory();
  const logoutAll = async () => {
    try {
      const response = await api(`${apiUrl}/auth/log-out-all-devices`);
      if (response.status == 200) {
        return { message: "Successfull" };
      }
    } catch (error) {}
  };
  // Post context data
  const userContextData = {
    logoutAll,
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
