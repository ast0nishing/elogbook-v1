/** @format */

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://sleepy-inlet-56101.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";
export const COURSES_LOADED_SUCCESS = "COURES_LOADED_SUCCESS";
export const COURSES_LOADED_FAIL = "COURSES_LOADED_FAIL";
export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const FIND_COURSE = "FIND_COURSE";

export const STUDENTS_LOADED_SUCCESS = "STUDENTS_LOADED_SUCCESS";
export const STUDENTS_LOADED_FAIL = "STUDENTS_LOADED_FAIL";
export const ADD_STUDENT = "ADD_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const FIND_STUDENT = "FIND_STUDENt";
