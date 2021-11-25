/** @format */

export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, role },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        role,
      };

    default:
      return state;
  }
};
