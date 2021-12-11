/** @format */
import api from "../utils/api";
import { createContext, useReducer, useState } from "react";
import { rankingReducer } from "../reducers/rankingReducer";
import {
  apiUrl,
  RANKING_LOADED_FAIL,
  RANKING_LOADED_SUCCESS,
} from "./constants";

export const RankingContext = createContext();

const RankingContextProvider = ({ children }) => {
  // State
  const [rankingState, dispatch] = useReducer(rankingReducer, {
    rankings: [],
    rankingsLoading: true,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  // Get ranking using year and week
  const getRankingYearWeekGrade = async (input) => {
    try {
      const response = await api.get(
        `${apiUrl}/api/v1/teachers/ranking/${input.year}/${input.week}/${input.grade}`
      );
      if (response.status == 200) {
        dispatch({
          type: RANKING_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: RANKING_LOADED_FAIL });
    }
  };
  const getRankingYearGrade = async (input) => {
    try {
      const response = await api.get(
        `${apiUrl}/api/v1/teachers/year-grade-ranking/${input.year}/${input.grade}`
      );
      if (response.status == 200) {
        dispatch({
          type: RANKING_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: RANKING_LOADED_FAIL });
    }
  };

  const rankingContextData = {
    rankingState,
    getRankingYearGrade,
    getRankingYearWeekGrade,
    showToast,
    setShowToast,
  };

  return (
    <RankingContext.Provider value={rankingContextData}>
      {children}
    </RankingContext.Provider>
  );
};

export default RankingContextProvider;
