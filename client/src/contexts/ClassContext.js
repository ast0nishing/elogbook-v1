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

  // Add post
  const addClass = async (newClass) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/newClass`, newClass);
      if (response.data.success) {
        dispatch({ type: ADD_CLASS, payload: response.data.cla });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
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
        updatedPost
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
  };

  return (
    <ClassContext.Provider value={classContextData}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
