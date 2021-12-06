/** @format */

import { createContext, useReducer, useState } from "react";
import { lessonReducer } from "../reducers/lessonReducer";
import {
  apiUrl,
  LESSONS_LOADED_FAIL,
  LESSONS_LOADED_SUCCESS,
  ADD_LESSON,
  DELETE_LESSON,
  UPDATE_LESSON,
  FIND_LESSON,
} from "./constants";

import axios from "axios";
export const LessonContext = createContext();

const LessonContextProvider = ({ children }) => {
  // State
  const [lessonState, dispatch] = useReducer(lessonReducer, {
    lesson: null,
    lessons: [],
    lessonsLoading: true,
  });

  const [showAddLessonTable, setShowAddLessonTable] = useState(false);
  const [showUpdateLessonTable, setShowUpdateLessonTable] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all courses
  const getLessons = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/lesson`);
      if (response.data.success) {
        dispatch({
          type: LESSONS_LOADED_SUCCESS,
          payload: response.data.lessons,
        });
      }
    } catch (error) {
      dispatch({ type: LESSONS_LOADED_FAIL });
    }
  };

  // Add lessons
  const addLesson = async (newLesson) => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/createLesson`,
        newLesson
      );
      if (response.status == 200) {
        // dispatch({ type: ADD_LESSON, payload: response.data.lesson });
        // return response.data;
        if (response.data["Already exist(s) code(s)"].length !== 0) {
          return { message: "Already exists" };
        } else {
          return { message: "Successfull" };
        }
      }
    } catch (error) {
      return { message: "Internal Server Error" };
    }
  };

  // Delete post
  const deleteLesson = async (lessonId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/lesson/${lessonId}`);
      if (response.data.success)
        dispatch({ type: DELETE_LESSON, payload: lessonId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findLesson = (lessonId) => {
    const lesson = lessonState.lessons.find((lesson) => lesson.id === lessonId);
    dispatch({ type: FIND_LESSON, payload: lesson });
  };

  // Update post
  const updateLesson = async (updatedLesson) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/lesson/${updatedLesson.id}`,
        updatedLesson
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_LESSON, payload: response.data.lesson });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const lessonContextData = {
    lessonState,
    getLessons,
    showAddLessonTable,
    setShowAddLessonTable,
    showUpdateLessonTable,
    setShowUpdateLessonTable,
    addLesson,
    showToast,
    setShowToast,
    deleteLesson,
    findLesson,
    updateLesson,
  };

  return (
    <LessonContext.Provider value={lessonContextData}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonContextProvider;
