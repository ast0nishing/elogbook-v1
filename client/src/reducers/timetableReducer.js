/** @format */
import {
  TIMETABLES_LOADED_SUCCESS,
  TIMETABLES_LOADED_FAIL,
  ADD_TIMETABLE,
  DELETE_TIMETABLE,
  UPDATE_TIMETABLE,
  FIND_TIMETABLE,
} from "../contexts/constants";

export const timetableReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TIMETABLES_LOADED_SUCCESS:
      return {
        ...state,
        timetables: payload,
        timetablesLoading: false,
      };

    case TIMETABLES_LOADED_FAIL:
      return {
        ...state,
        timetables: [],
        timetablesLoading: false,
      };

    case ADD_TIMETABLE:
      return {
        ...state,
        timetables: [...state.timetables, payload],
      };

    case DELETE_TIMETABLE:
      return {
        ...state,
        timetables: state.timetables.filter(
          (timetable) => timetable.id !== payload
        ),
      };

    case FIND_TIMETABLE:
      return { ...state, timetable: payload };

    case UPDATE_TIMETABLE:
      const newTimetables = state.timetables.map((timetable) =>
        timetable.id === payload.id ? payload : timetable
      );

      return {
        ...state,
        timetables: newTimetables,
      };

    default:
      return state;
  }
};
