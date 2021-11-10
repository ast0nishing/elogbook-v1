/** @format */

// /** @format */

// import { createContext, useReducer, useState } from "react";
// import { courseReducer } from "../reducers/postReducer";
// import {
//   apiUrl,
//   COURSES_LOADED_FAIL,
//   COURSES_LOADED_SUCCESS,
//   ADD_COURSE,
//   DELETE_COURSE,
//   UPDATE_COURSE,
//   FIND_COURSE,
// } from "./constants";

// import axios from "axios";
// export const CourseContext = createContext();

// const CourseContextProvider = ({ children }) => {
//   // State
//   const [courseState, dispatch] = useReducer(courseReducer, {
//     course: null,
//     courses: [],
//     coursesLoading: true,
//   });

//   const [showAddCourseTable, setShowAddCourseTable] = useState(false);
//   const [showUpdateCourseTable, setShowUpdateCourseTable] = useState(false);
//   const [showToast, setShowToast] = useState({
//     show: false,
//     message: "",
//     type: null,
//   });

//   // Get all courses
//   const getCourses = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/course`);
//       if (response.data.success) {
//         dispatch({
//           type: POSTS_LOADED_SUCCESS,
//           payload: response.data.courses,
//         });
//       }
//     } catch (error) {
//       dispatch({ type: POSTS_LOADED_FAIL });
//     }
//   };

//   // Add post
//   const addPost = async (newPost) => {
//     try {
//       const response = await axios.post(`${apiUrl}/posts`, newPost);
//       if (response.data.success) {
//         dispatch({ type: ADD_POST, payload: response.data.post });
//         return response.data;
//       }
//     } catch (error) {
//       return error.response.data
//         ? error.response.data
//         : { success: false, message: "Server error" };
//     }
//   };

//   // Delete post
//   const deletePost = async (postId) => {
//     try {
//       const response = await axios.delete(`${apiUrl}/posts/${postId}`);
//       if (response.data.success)
//         dispatch({ type: DELETE_POST, payload: postId });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Find post when user is updating post
//   const findPost = (postId) => {
//     const post = postState.posts.find((post) => post._id === postId);
//     dispatch({ type: FIND_POST, payload: post });
//   };

//   // Update post
//   const updatePost = async (updatedPost) => {
//     try {
//       const response = await axios.put(
//         `${apiUrl}/posts/${updatedPost._id}`,
//         updatedPost
//       );
//       if (response.data.success) {
//         dispatch({ type: UPDATE_POST, payload: response.data.post });
//         return response.data;
//       }
//     } catch (error) {
//       return error.response.data
//         ? error.response.data
//         : { success: false, message: "Server error" };
//     }
//   };

//   // Post context data
//   const postContextData = {
//     postState,
//     getPosts,
//     showAddPostModal,
//     setShowAddPostModal,
//     showUpdatePostModal,
//     setShowUpdatePostModal,
//     addPost,
//     showToast,
//     setShowToast,
//     deletePost,
//     findPost,
//     updatePost,
//   };

//   return (
//     <PostContext.Provider value={postContextData}>
//       {children}
//     </PostContext.Provider>
//   );
// };

// export default PostContextProvider;
