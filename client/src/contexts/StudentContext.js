/** @format */
import api from "../utils/api";
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
  const [showUpdateStudentTable, setShowUpdateStudentTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all students
  const getStudents = async (input) => {
    try {
      const response = await api.get(
        `${apiUrl}/api/v1/schools/students/${input.year}/${input.name}`
      );
      if (response.status == 200) {
        dispatch({
          type: STUDENTS_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: STUDENTS_LOADED_FAIL });
    }
  };
  // Add student
  const addStudent = async (newStudent) => {
    try {
      const response = await api.post(
        `${apiUrl}/api/v1/schools/createStudent`,
        newStudent
      );
      if (response.status == 200) {
        // dispatch({ type: ADD_STUDENT, payload: response.data.student });
        return { message: "Sucessfull" };
      }
    } catch (error) {
      try {
        if (error.response.data) {
          const len_missing_infor = error.response.data["Missing info"].length;
          const len_invalid_id =
            error.response.data["Invalid Student ID"].length;
          const len_existed_teacher =
            error.response.data["Already Exist Students"].length;
          const len_invalid_suffix =
            error.response.data["Invalid Username Suffix"].length;
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
              "Already existed students: " +
              len_existed_teacher,
          };
        }
      } catch (error) {
        return { message: "Server error" };
      }
    }
  };
  //  Add student to class
  const addClassStudent = async (state) => {
    try {
      const response = await api.post(
        `${apiUrl}/api/v1/schools/addStudent`,
        state
      );
      if (response.status == 200) {
        return {
          message: response.data.msg ? response.data.msg : "Successfull",
        };
      }
    } catch (error) {
      return { message: "Fail" };
    }
  };

  // Delete post
  const deleteStudent = async (studentId) => {
    try {
      const url = `${apiUrl}/api/v1/schools/deleteStudent/${studentId}`;
      const response = await api.delete(url);
      if (response.status == 200)
        dispatch({ type: DELETE_STUDENT, payload: studentId });
      return { message: "Delete successfull" };
    } catch (error) {
      return { message: "Fail" };
    }
  };

  // Find student when user is updating student
  const findStudent = (studentId) => {
    const student = studentState.students.find(
      (student) => student.studentId === studentId
    );
    dispatch({ type: FIND_STUDENT, payload: student });
  };

  // Update student
  const updateStudent = async (updatedStudent) => {
    try {
      const response = await api.put(
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
    setShowUpdateStudentTable,
    addStudent,
    addClassStudent,
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
