/** @format */

import { createContext, useReducer, useState } from "react";
import { timetablebookReducer } from "../reducers/timetablebookReducer";
import {
  apiUrl,
  TIMETABLES_LOADED_FAIL,
  TIMETABLES_LOADED_SUCCESS,
  ADD_TIMETABLE,
  DELETE_TIMETABLE,
  UPDATE_TIMETABLE,
  FIND_TIMETABLE,
} from "./constants";

import axios from "axios";
export const TimeTableContext = createContext();

const TimeTableContextProvider = ({ children }) => {
  // State
  const [timetableState, dispatch] = useReducer(timetableReducer, {
    timetable: null,
    timetables: [],
    timetablesLoading: true,
  });

  const [showAddTimeTableTable, setShowAddTimeTableTable] = useState(false);
  const [showUpdateTimeTableTable, setShowUpdateTimeTableTable] =
    useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all timetables
  const getTimeTables = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/timetable`);
      if (response.data.success) {
        dispatch({
          type: TIMETABLES_LOADED_SUCCESS,
          payload: response.data.timetables,
        });
      }
    } catch (error) {
      dispatch({ type: TIMETABLES_LOADED_FAIL });
    }
  };

  // Add post
  const addTimeTable = async (newTimeTable) => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/newTimeTable`,
        newTimeTable
      );
      if (response.data.success) {
        dispatch({ type: ADD_TIMETABLE, payload: response.data.timetable });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteLessson = async (timetableId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/admin/timetable/${timetableId}`
      );
      if (response.data.success)
        dispatch({ type: DELETE_TIMETABLE, payload: timetableId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findTimeTable = (timetableId) => {
    const timetable = timetableState.timetable.find(
      (timetable) => timetable._id === timetableId
    );
    dispatch({ type: FIND_TIMETABLE, payload: timetable });
  };

  // Update post
  const updateTimeTable = async (updatedTimeTable) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/timetable/${updatedTimeTable._id}`,
        updatedTimeTable
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_TIMETABLE, payload: response.data.timetable });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const timetableContextData = {
    timetableState,
    getTimeTables,
    showAddTimeTableTable,
    setShowAddTimeTableTable,
    showUpdateTimeTableTable,
    setShowUpdateTimeTableTable,
    addCTimeTable,
    showToast,
    setShowToast,
    deleteTimeTable,
    findTimeTable,
    updateTimeTable,
  };

  return (
    <TimeTableContext.Provider value={timetableContextData}>
      {children}
    </TimeTableContext.Provider>
  );
};

export default TimeTableContextProvider;
