/** @format */

import {
  RANKING_LOADED_FAIL,
  RANKING_LOADED_SUCCESS,
} from "../contexts/constants";

export const rankingReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case RANKING_LOADED_SUCCESS:
      return {
        ...state,
        rankings: payload,
        rankingsLoading: false,
      };

    case RANKING_LOADED_FAIL:
      return {
        ...state,
        rankings: [],
        rankingsLoading: false,
      };

    default:
      return state;
  }
};
