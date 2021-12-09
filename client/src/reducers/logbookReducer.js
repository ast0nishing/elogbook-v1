/** @format */

import {
  LOGBOOKS_LOADED_SUCCESS,
  LOGBOOKS_LOADED_FAIL,
  ADD_LOGBOOK,
  DELETE_LOGBOOK,
  UPDATE_LOGBOOK,
  FIND_LOGBOOK,
} from "../contexts/constants";

export const logbookReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGBOOKS_LOADED_SUCCESS:
      return {
        ...state,
        logbooks: payload,
        logbooksLoading: false,
      };

    case LOGBOOKS_LOADED_FAIL:
      return {
        ...state,
        logbooks: [],
        logbooksLoading: false,
      };

    case ADD_LOGBOOK:
      return {
        ...state,
        logbooks: [...state.logbooks, payload],
      };

    case DELETE_LOGBOOK:
      return {
        ...state,
        logbooks: state.logbooks.filter((logbook) => logbook.id !== payload),
      };

    case FIND_LOGBOOK:
      return { ...state, logbook: payload };

    case UPDATE_LOGBOOK:
      const newLogbooks = state.logbooks.map((logbook) =>
        logbook.code === payload.id ? payload : logbook
      );

      return {
        ...state,
        logbooks: newLogbooks,
      };

    default:
      return state;
  }
};
