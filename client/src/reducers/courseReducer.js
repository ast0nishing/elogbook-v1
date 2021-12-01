/** @format */

import {
  COURSES_LOADED_SUCCESS,
  COURSES_LOADED_FAIL,
  ADD_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  FIND_COURSE,
} from "../contexts/constants";

export const courseReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case COURSES_LOADED_SUCCESS:
      return {
        ...state,
        courses: payload,
        coursesLoading: false,
      };

    case COURSES_LOADED_FAIL:
      return {
        ...state,
        courses: [],
        coursesLoading: false,
      };

    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, payload],
      };

    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course.code !== payload),
      };

    case FIND_COURSE:
      return { ...state, course: payload };

    case UPDATE_COURSE:
      const newCourses = state.courses.map((course) =>
        course.code == payload ? payload : course
      );
      return {
        ...state,
        courses: newCourses,
      };

    default:
      return state;
  }
};
