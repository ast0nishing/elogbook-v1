/** @format */
import api from "../utils/api";
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
  MATRIX_LOGBOOKS_LOADED_SUCCESS,
} from "./constants";
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
      const response = await api.get(`${apiUrl}/admin/logbook`);
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
  // Get logbook
  const getLogbookYearWeekClass = async (input) => {
    try {
      const response = await api.get(
        `${apiUrl}/api/v1/logbooks/${input.year}/${input.className}/${input.week}`
      );

      if (response.status == 200) {
        // unique function
        const days = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thurday",
          "Friday",
          "Saturday",
        ];
        const times = [
          "07:30:00",
          "08:30:00",
          "09:30:00",
          "10:30:00",
          "11:30:00",
          "13:30:00",
          "14:30:00",
        ];
        var schedules = [];

        days.forEach(function (day) {
          times.forEach(function (time) {
            var mini = {
              Date: day,
              Time: time,
              Course: "NA",
              Lesson: "NA",
              Teacher: "NA",
              Grade: "NA",
              Comment: "NA",
              Note: "NA",
              key: time + day,
            };
            mini["id"] = "NA";
            schedules.push(mini);
          });
        });
        schedules.forEach(function (el) {
          response.data.forEach(function (rs) {
            if ((rs.time == el.Time) & (rs.day == el.Date)) {
              el["Course"] = rs.courseName;
              el["Lesson"] = rs.lessonName;
              el["Teacher"] = rs.teacherName;
              el["Grade"] = rs.grade;
              el["Comment"] = rs.comment;
              el["Note"] = rs.note;
            }
          });
        });
      }
      dispatch({
        type: MATRIX_LOGBOOKS_LOADED_SUCCESS,
        payload: schedules,
      });
      dispatch({
        type: LOGBOOKS_LOADED_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: LOGBOOKS_LOADED_FAIL });
    }
  };

  // Add logbook
  const addLogbook = async (newLogbook) => {
    try {
      const response = await api.post(`${apiUrl}/api/v1/logbooks/`, newLogbook);
      if (response.status == 200) {
        dispatch({ type: ADD_LOGBOOK, payload: response.data });
        return { message: "sucessfull" };
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteLogbook = async (logbookId) => {
    try {
      const response = await api.delete(`${apiUrl}/admin/logbook/${logbookId}`);
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
      const response = await api.put(
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
    addLogbook,
    showToast,
    setShowToast,
    deleteLogbook,
    findLogbook,
    updateLogbook,
    getLogbookYearWeekClass,
  };

  return (
    <LogbookContext.Provider value={logbookContextData}>
      {children}
    </LogbookContext.Provider>
  );
};

export default LogbookContextProvider;
