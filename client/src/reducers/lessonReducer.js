/** @format */

import {
  LESSONS_LOADED_SUCCESS,
  LESSONS_LOADED_FAIL,
  ADD_LESSON,
  DELETE_LESSON,
  UPDATE_LESSON,
  FIND_LESSON,
} from "../contexts/constants";

export const lessonReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LESSONS_LOADED_SUCCESS:
      return {
        ...state,
        lessons: payload,
        lessonsLoading: false,
      };

    case LESSONS_LOADED_FAIL:
      return {
        ...state,
        lessons: [],
        lessonsLoading: false,
      };

    case ADD_LESSON:
      return {
        ...state,
        lessons: [...state.lessons, payload],
      };

    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => lesson.id !== payload),
      };

    case FIND_LESSON:
      return { ...state, lesson: payload };

    case UPDATE_LESSON:
      const newLessons = state.lessons.map((lesson) =>
        lesson.code === payload.id ? payload : lesson
      );

      return {
        ...state,
        lessons: newLessons,
      };

    default:
      return state;
  }
};
