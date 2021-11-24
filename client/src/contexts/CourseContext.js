/** @format */

import { createContext, useReducer, useState } from "react";
import { courseReducer } from "../reducers/courseReducer";
import {
  apiUrl,
  COURSES_LOADED_FAIL,
  COURSES_LOADED_SUCCESS,
  ADD_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  FIND_COURSE,
} from "./constants";

import axios from "axios";
export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  // State
  const [courseState, dispatch] = useReducer(courseReducer, {
    course: null,
    courses: [],
    coursesLoading: true,
  });

  const [showAddCourseTable, setShowAddCourseTable] = useState(false);
  const [showUpdateCourseTable, setShowUpdateCourseTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all courses
  const getCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/course`);
      if (response.data.success) {
        dispatch({
          type: COURSES_LOADED_SUCCESS,
          payload: response.data.courses,
        });
      }
    } catch (error) {
      dispatch({ type: COURSES_LOADED_FAIL });
    }
  };

  // Add post
  const addCourse = async (newCourse) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/newCourse`, newCourse);
      if (response.data.success) {
        dispatch({ type: ADD_COURSE, payload: response.data.course });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/course/${courseId}`);
      if (response.data.success)
        dispatch({ type: DELETE_COURSE, payload: courseId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findCourse = (courseId) => {
    const course = courseState.courses.find(
      (course) => course._id === courseId
    );
    dispatch({ type: FIND_COURSE, payload: course });
  };

  // Update post
  const updateCourse = async (updatedCourse) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/course/${updatedCourse._id}`,
        updatedCourse
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_COURSE, payload: response.data.course });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const courseContextData = {
    courseState,
    getCourses,
    showAddCourseTable,
    setShowAddCourseTable,
    showUpdateCourseTable,
    setShowUpdateCourseTable,
    addCourse,
    showToast,
    setShowToast,
    deleteCourse,
    findCourse,
    updateCourse,
  };

  return (
    <CourseContext.Provider value={courseContextData}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;
