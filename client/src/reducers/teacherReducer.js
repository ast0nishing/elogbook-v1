/** @format */
import {
  TEACHERS_LOADED_SUCCESS,
  TEACHERS_LOADED_FAIL,
  ADD_TEACHER,
  DELETE_TEACHER,
  UPDATE_TEACHER,
  FIND_TEACHER,
} from "../contexts/constants";

export const teacherReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEACHERS_LOADED_SUCCESS:
      return {
        ...state,
        teachers: payload,
        teachersLoading: false,
      };
    case TEACHERS_LOADED_FAIL:
      return {
        ...state,
        teachers: [],
        teachersLoading: false,
      };
    case ADD_TEACHER:
      return {
        ...state,
        teachers: [...state.teachers, payload],
      };

    case DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher.username !== payload
        ),
      };

    case FIND_TEACHER:
      return { ...state, teacher: payload };

    case UPDATE_TEACHER:
      const newTeachers = state.teachers.map((teacher) =>
        teacher.username === payload.username ? payload : teacher
      );

      return {
        ...state,
        teachers: newTeachers,
      };

    default:
      return state;
  }
};
