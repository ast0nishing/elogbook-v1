/** @format */

import {
  CLASSES_LOADED_SUCCESS,
  CLASSES_LOADED_FAIL,
  ADD_CLASS,
  DELETE_CLASS,
  UPDATE_CLASS,
  FIND_CLASS,
} from "../contexts/constants";

export const classReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLASSES_LOADED_SUCCESS:
      return {
        ...state,
        classes: payload,
        classesLoading: false,
      };

    case CLASSES_LOADED_FAIL:
      return {
        ...state,
        classes: [],
        classesLoading: false,
      };

    case ADD_CLASS:
      return {
        ...state,
        classes: [...state.classes, payload],
      };

    case DELETE_CLASS:
      return {
        ...state,
        classes: state.classes.filter((classes) => classes.code !== payload),
      };

    case FIND_CLASS:
      return { ...state, class_: payload };

    case UPDATE_CLASS:
      const newClasses = state.classes.map((class_) =>
        class_.code === payload.code ? payload : class_
      );

      return {
        ...state,
        classes: newClasses,
      };

    default:
      return state;
  }
};
