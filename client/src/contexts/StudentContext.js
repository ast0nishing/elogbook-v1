/** @format */
import { createContext, useReducer, useState } from "react";
import { studentReducer } from "../reducers/studentReducer";
import {
  apiUrl,
  STUDENTS_LOADED_FAIL,
  STUDENTS_LOADED_SUCCESS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  FIND_STUDENT,
} from "./constants";
import axios from "axios";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  // State
  const [studentState, dispatch] = useReducer(studentReducer, {
    student: null,
    students: [],
    studentsLoading: true,
  });

  const [showAddStudentTable, setShowAddStudentTable] = useState(false);
  const [showUpdateStudentTable, setShowUpdateStudentTablel] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all students
  const getStudents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/student`);
      if (response.data.success) {
        dispatch({
          type: STUDENTS_LOADED_SUCCESS,
          payload: response.data.students,
        });
      }
    } catch (error) {
      dispatch({ type: STUDENTS_LOADED_FAIL });
    }
  };
  // Add student
  const addStudents = async (newStudent) => {
    try {
      const response = await axios.post(`${apiUrl}/student`, newStudent);
      if (response.data.success) {
        dispatch({ type: ADD_STUDENT, payload: response.data.student });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteStudent = async (studentId) => {
    try {
      const response = await axios.delete(`${apiUrl}/student/${studentId}`);
      if (response.data.success)
        dispatch({ type: DELETE_STUDENT, payload: studentId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findStudent = (studentId) => {
    const student = studentState.students.find(
      (student) => student._id === studentId
    );
    dispatch({ type: FIND_STUDENT, payload: student });
  };

  // Update post
  const updateStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(
        `${apiUrl}/student/${updatedStudent._id}`,
        updatedStudent
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_STUDENT, payload: response.data.student });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const studentContextData = {
    studentState,
    getStudents,
    showAddStudentTable,
    setShowAddStudentTable,
    showUpdateStudentTable,
    setShowUpdateStudentTablel,
    addStudents,
    showToast,
    setShowToast,
    deleteStudent,
    findStudent,
    updateStudent,
  };

  return (
    <StudentContext.Provider value={studentContextData}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
