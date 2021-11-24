/** @format */

import { createContext, useReducer, useState } from "react";
import { logbookReducer } from "../reducers/logbookReducer";
import {
  apiUrl,
  LOGBOOKS_LOADED_FAIL,
  LOGBOOKS_LOADED_SUCCESS,
  ADD_LOGBOOK,
  DELETE_LOGBOOK,
  UPDATE_LOGBOOK,
  FIND_LOGBOOK,
} from "./constants";

import axios from "axios";
export const LogbookContext = createContext();

const LogbookContextProvider = ({ children }) => {
  // State
  const [logbookState, dispatch] = useReducer(logbookReducer, {
    logbook: null,
    logbooks: [],
    logbooksLoading: true,
  });

  const [showAddLogbookTable, setShowAddLogbookTable] = useState(false);
  const [showUpdateLogbookTable, setShowUpdateLogbookTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all logbooks
  const getLogbooks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/logbook`);
      if (response.data.success) {
        dispatch({
          type: LOGBOOKS_LOADED_SUCCESS,
          payload: response.data.logbooks,
        });
      }
    } catch (error) {
      dispatch({ type: LOGBOOKS_LOADED_FAIL });
    }
  };

  // Add post
  const addLogbook = async (newLogbook) => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/newLogbook`,
        newLogbook
      );
      if (response.data.success) {
        dispatch({ type: ADD_LOGBOOK, payload: response.data.logbook });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteLessson = async (logbookId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/admin/logbook/${logbookId}`
      );
      if (response.data.success)
        dispatch({ type: DELETE_LOGBOOK, payload: logbookId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findLogbook = (logbookId) => {
    const logbook = logbookState.logbook.find(
      (logbook) => logbook._id === logbookId
    );
    dispatch({ type: FIND_LOGBOOK, payload: logbook });
  };

  // Update post
  const updateLogbook = async (updatedLogbook) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/logbook/${updatedLogbook._id}`,
        updatedLogbook
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_LOGBOOK, payload: response.data.logbook });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const logbookContextData = {
    logbookState,
    getLogbooks,
    showAddLogbookTable,
    setShowAddLogbookTable,
    showUpdateLogbookTable,
    setShowUpdateLogbookTable,
    addCLogbook,
    showToast,
    setShowToast,
    deleteLogbook,
    findLogbook,
    updateLogbook,
  };

  return (
    <LogbookContext.Provider value={logbookContextData}>
      {children}
    </LogbookContext.Provider>
  );
};

export default LogbookContextProvider;
