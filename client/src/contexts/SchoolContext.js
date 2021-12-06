/** @format */
// Refresh-token
import { createContext, useContext, useReducer, useState } from "react";
import { schoolReducer } from "../reducers/schoolReducer";
import {
  apiUrl,
  SCHOOLS_LOADED_FAIL,
  SCHOOLS_LOADED_SUCCESS,
  ADD_SCHOOL,
  DELETE_SCHOOL,
  UPDATE_SCHOOL,
  FIND_SCHOOL,
} from "./constants";

import axios from "axios";
export const SchoolContext = createContext();
const SchoolContextProvider = ({ children }) => {
  // State
  const [schoolState, dispatch] = useReducer(schoolReducer, {
    school: null,
    schools: [],
    schoolsLoading: true,
  });

  const [showAddSchoolTable, setShowAddSchoolTable] = useState(false);
  const [showUpdateSchoolTable, setShowUpdateSchoolTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all students
  const getSchools = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/schools`);
      if (response.data.success) {
        dispatch({
          type: SCHOOLS_LOADED_SUCCESS,
          payload: response.data.schools,
        });
      }
    } catch (error) {
      dispatch({ type: SCHOOLS_LOADED_FAIL });
    }
  };
  // Add school
  const addSchool = async (newSchool) => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/createSchool`,
        newSchool
      );
      if (response.status == 200) {
        console.log(response.data);
        dispatch({ type: ADD_SCHOOL, payload: response.data.school });
        return { success: true, message: "Work" };
      } else if (response.status !== 200) {
        return { message: response.data };
      }
    } catch (error) {
      return { success: false, message: "Error" };
    }
  };
  // Delete post
  const deleteSchool = async (schoolId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/school/${schoolId}`);
      if (response.data.success)
        dispatch({ type: DELETE_SCHOOL, payload: schoolId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find student when user is updating student
  const findSchool = (schoolId) => {
    const school = schoolState.schools.find(
      (school) => school._id === schoolId
    );
    dispatch({ type: FIND_SCHOOL, payload: school });
  };

  // Update student
  const updateSchool = async (updatedSchool) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/student/${updatedSchool._id}`,
        updatedSchool
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_SCHOOL, payload: response.data.school });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const schoolContextData = {
    schoolState,
    getSchools,
    showAddSchoolTable,
    setShowAddSchoolTable,
    showUpdateSchoolTable,
    setShowUpdateSchoolTable,
    addSchool,
    showToast,
    setShowToast,
    deleteSchool,
    findSchool,
    updateSchool,
  };

  return (
    <SchoolContext.Provider value={schoolContextData}>
      {children}
    </SchoolContext.Provider>
  );
};

export default SchoolContextProvider;
