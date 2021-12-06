/** @format */
import { createContext, useReducer, useState } from "react";
import { teacherReducer } from "../reducers/teacherReducer";
import {
  apiUrl,
  TEACHERS_LOADED_FAIL,
  TEACHERS_LOADED_SUCCESS,
  ADD_TEACHER,
  DELETE_TEACHER,
  UPDATE_TEACHER,
  FIND_TEACHER,
} from "./constants";

import axios from "axios";
export const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
  // State
  const [teacherState, dispatch] = useReducer(teacherReducer, {
    teacher: null,
    teachers: [],
    teachersLoading: true,
  });

  const [showAddTeacherTable, setShowAddTeacherTable] = useState(false);
  const [showUpdateTeacherTable, setShowUpdateTeacherTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all teacher
  const getTeachers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/schools/teachers`);
      if (response.status == 200) {
        dispatch({
          type: TEACHERS_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: TEACHERS_LOADED_FAIL });
    }
  };
  // Get teacher in specific year and class
  const getClassTeachers = async (year, class_name) => {
    try {
      const url = `${apiUrl}/${year}/${class_name}/teachers`;
      const response = await axios.get(url);
      if (response.status == 200) {
        dispatch({
          type: TEACHERS_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: TEACHERS_LOADED_FAIL });
    }
  };
  // Add teacher
  const addTeachers = async (newTeacher) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/schools/createTeacher`,
        newTeacher
      );
      if (response.status == 200) {
        dispatch({ type: ADD_TEACHER, payload: response.data });
        return { success: true, message: response.data };
      }
    } catch (error) {
      return { success: false, message: "Error" };
      // error.response.data
      //   ? error.response.data
      //   : // : { success: false, message: "Server error" };
    }
  };
  // Add teacher to specific class if they have
  const addClassTeachers = async (newClassTeacher) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/schools/addTeacher`,
        newClassTeacher
      );
      if (response.status == 200) {
        dispatch({ type: ADD_TEACHER, payload: response.data });
        return { success: true, message: response.data };
      }
    } catch (error) {
      return { success: false, message: "Error" };
      // error.response.data
      //   ? error.response.data
      //   : // : { success: false, message: "Server error" };
    }
  };
  // Delete teachers
  const deleteTeachers = async (teacherId) => {
    try {
      const response = await axios.delete(`${apiUrl}/v1/schools/deleteTeacher`);
      if (response.status == 200)
        dispatch({ type: DELETE_TEACHER, payload: teacherId });
      return { sucess: true, message: "Sucessfull" };
    } catch (error) {
      return { sucess: false, message: "Fail" };
    }
  };

  // Find teacher in list
  const findTeacher = (teacherId) => {
    const teacher = teacherState.teachers.find(
      (teacher) => teacher.username === teacherId
    );
    dispatch({ type: FIND_TEACHER, payload: teacher });
  };

  // Update teacher in list
  const updateTeacher = async (updatedTeacher) => {
    try {
      const response = await axios.put(
        `${apiUrl}/v1/schools/teacher/${updatedTeacher.username}`,
        updatedTeacher
      );
      if (response.status === 200) {
        dispatch({ type: UPDATE_TEACHER, payload: response.teacher });
        return { message: "Sucessfull", teacher: response.teacher };
      }
    } catch (error) {
      return { message: "Fail" };
    }
  };

  // Post context data
  const teacherContextData = {
    teacherState,
    getTeachers,
    getClassTeachers,
    showAddTeacherTable,
    setShowAddTeacherTable,
    showUpdateTeacherTable,
    setShowUpdateTeacherTable,
    addTeachers,
    addClassTeachers,
    showToast,
    setShowToast,
    deleteTeachers,
    findTeacher,
    updateTeacher,
  };

  return (
    <TeacherContext.Provider value={teacherContextData}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContextProvider;
