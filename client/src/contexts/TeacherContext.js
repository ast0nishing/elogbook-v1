/** @format */
import api from "../utils/api";
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
      const response = await api.get(`${apiUrl}/api/v1/schools/teachers`);
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
  const getClassTeachers = async (classyear) => {
    try {
      const url = `${apiUrl}/api/v1/schools/${classyear.year}/${classyear.name}/teachers`;
      const response = await api.get(url);
      if (response.status == 200) {
        if (response.data.length == 0);
        {
          console.log("Hi hi");
        }
        // dispatch({
        //   type: TEACHERS_LOADED_SUCCESS,
        //   payload: response.data,
        // });
      }
    } catch (error) {
      dispatch({ type: TEACHERS_LOADED_FAIL });
    }
  };
  // Add teacher
  const addTeachers = async (newTeacher) => {
    try {
      const response = await api.post(
        `${apiUrl}/api/v1/schools/createTeacher`,
        newTeacher
      );
      if (response.status == 200) {
        // dispatch({ type: ADD_TEACHER, payload: getTeachers() });
        getTeachers();
        return { success: true, message: response.data.msg };
      }
    } catch (error) {
      try {
        if (error.response.data) {
          const len_missing_infor =
            error.response.data["Missing primary info"].length;
          const len_invalid_id =
            error.response.data["Invalid Teacher ID"].length;
          const len_existed_teacher =
            error.response.data["Already exists teacher"].length;
          const len_invalid_suffix =
            error.response.data["Invalid username suffix"].length;
          return {
            message:
              "Missing infor: " +
              len_missing_infor +
              "\n Invalid id: " +
              len_invalid_id +
              "\n" +
              "Invalid suffix: " +
              len_invalid_suffix +
              "\n" +
              "Already exists teacher: " +
              len_existed_teacher,
          };
        }
      } catch (error) {
        return { message: "Server error" };
      }
    }
  };
  // Add teacher to specific class if they have
  const addClassTeachers = async (newClassTeacher) => {
    try {
      const response = await api.post(
        `${apiUrl}/api/v1/schools/addTeacher`,
        newClassTeacher
      );
      if (response.status == 200) {
        dispatch({ type: ADD_TEACHER, payload: response.data });
        return {
          success: true,
          message: response.data.msg ? response.data.msg : "Sucessfull",
        };
      }
    } catch (error) {
      try {
        if (error.response.data) {
          const len_missing_infor =
            error.response.data["Missing primary info"].length;
          return { message: "Missing infor " + len_missing_infor };
        }
      } catch (error) {
        return { message: "Server error" };
      }
    }
  };
  // Delete teachers
  const deleteTeacher = async (teacherId) => {
    try {
      const response = await api.delete(
        `${apiUrl}/api/v1/schools/deleteTeacher/${teacherId}`
      );
      if (response.status == 200)
        dispatch({ type: DELETE_TEACHER, payload: teacherId });
      return {
        success: true,
        message: response.data.message
          ? response.data.message
          : response.data.error,
      };
    } catch (error) {
      return { sucess: false, message: "Fail" };
    }
  };

  // Find teacher in list
  const findTeacher = (teacherId) => {
    const teacher = teacherState.teachers.find(
      (teacher) => teacher.teacherId === teacherId
    );
    dispatch({ type: FIND_TEACHER, payload: teacher });
  };

  // Update teacher in list
  const updateTeacher = async (updatedTeacher) => {
    try {
      const response = await api.put(
        `${apiUrl}/api/v1/teachers/}`,
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
    deleteTeacher,
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
