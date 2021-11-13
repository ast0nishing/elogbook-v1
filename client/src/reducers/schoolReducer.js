/** @format */
import {
  SCHOOLS_LOADED_SUCCESS,
  SCHOOLS_LOADED_FAIL,
  ADD_SCHOOL,
  DELETE_SCHOOL,
  UPDATE_SCHOOL,
  FIND_SCHOOL,
} from "../contexts/constants";
export const schoolReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SCHOOLS_LOADED_SUCCESS:
      return {
        ...state,
        schools: payload,
        schoolsLoading: false,
      };

    case SCHOOLS_LOADED_FAIL:
      return {
        ...state,
        students: [],
        studentsLoading: false,
      };

    case ADD_SCHOOL:
      return {
        ...state,
        schools: [...state.schools, payload],
      };

    case DELETE_SCHOOL:
      return {
        ...state,
        schools: state.schools.filter((school) => school._id !== payload),
      };

    case FIND_SCHOOL:
      return { ...state, school: payload };

    case UPDATE_SCHOOL:
      const newSchools = state.schools.map((school) =>
        school._id === payload._id ? payload : school
      );

      return {
        ...state,
        schools: newSchools,
      };

    default:
      return state;
  }
};
