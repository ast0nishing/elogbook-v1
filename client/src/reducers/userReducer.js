/** @format */
import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  UPDATE_USER,
} from "../contexts/constants";

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
        userLoading: false,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        userLoading: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
