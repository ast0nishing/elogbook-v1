/** @format */

import { createContext, useReducer, useState } from "react";
import { classReducer } from "../reducers/classReducer";
import {
  apiUrl,
  CLASSES_LOADED_FAIL,
  CLASSES_LOADED_SUCCESS,
  ADD_CLASS,
  DELETE_CLASS,
  UPDATE_CLASS,
  FIND_CLASS,
} from "./constants";

import axios from "axios";
export const ClassContext = createContext();

const ClassContextProvider = ({ children }) => {
  // State
  const [classState, dispatch] = useReducer(classReducer, {
    class_: null,
    classes: [],
    classesLoading: true,
  });

  const [showAddClassTable, setShowAddClassTable] = useState(false);
  const [showUpdateClassTable, setShowUpdateClassTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all classes
  const getClasses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/class`);
      if (response.data.success) {
        dispatch({
          type: CLASSES_LOADED_SUCCESS,
          payload: response.data.classes,
        });
      }
    } catch (error) {
      dispatch({ type: CLASSES_LOADED_FAIL });
    }
  };

  // Add class
  const addClass = async (newClass) => {
    try {
      const url = `${apiUrl}/api/v1/schools/createClass`;
      const response = await axios.post(url, newClass);
      if (response.status == 200) {
        dispatch({ type: ADD_CLASS, payload: response.data.class });
        return { message: "Sucessfull" };
      }
    } catch (error) {
      return { message: "Fail" };
      // return error.response.data
      //   ? error.response.data
      //   : { success: false, message: "Server error" };
    }
  };
  // Add Class Teacher
  const addAll = async (state) => {
    try {
      const url = `${apiUrl}/api/v1/schools/createClassAddStudent`;
      const response = await axios.post(url, state);
      if (response.status == 200) {
        return { message: "Sucessfull" };
      }
    } catch (error) {
      return { message: "Fail" };
    }
  };

  // Delete post
  const deleteClass = async (classId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/class/${classId}`);
      if (response.data.success)
        dispatch({ type: DELETE_CLASS, payload: classId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findClass = (classId) => {
    const class_ = classState.classes.find((class_) => class_._id === classId);
    dispatch({ type: FIND_CLASS, payload: class_ });
  };

  // Update post
  const updateClass = async (updatedClass) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/class/${updatedClass._id}`,
        updatedClass
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_CLASS, payload: response.data.class });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const classContextData = {
    classState,
    getClasses,
    showAddClassTable,
    setShowAddClassTable,
    showUpdateClassTable,
    setShowUpdateClassTable,
    addClass,
    showToast,
    setShowToast,
    deleteClass,
    findClass,
    updateClass,
    addAll,
  };

  return (
    <ClassContext.Provider value={classContextData}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
