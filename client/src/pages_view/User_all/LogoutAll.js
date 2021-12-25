/** @format */
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermIdentity, Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
export default function LogoutAll() {
  // // Contexts
  const {
    userState: { user },
    updateUser,
    setShowToast,
    changePassword,
    logoutAll,
    showToast: { show, message, type },
  } = useContext(UserContext);
  // State
  const { logoutUser } = useContext(AuthContext);
  const [updatedState, setUpdatedState] = useState({
    oldPassword: null,
    newPassword: null,
  });
  // Context
  const history = useHistory();
  const onSubmit = async (event) => {
    history.push("/login");
    try {
      event.preventDefault();
      const { message, success } = await logoutAll();
      const logout = await logoutUser();
      setUpdatedState({ oldPassword: null, newPassword: null });
      setShowToast({ show: true, message, type: null });
      toast(message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      history.push("/login");
      //   if (message == "Successfull") {
      //     setUpdatedState({ oldPassword: null, newPassword: null });
      //     setShowToast({ show: true, message, type: null });
      //     toast(message);
      //     await new Promise((resolve) => setTimeout(resolve, 2000));
      //     history.push("/login");
      //   } else {
      //     setUpdatedState({ oldPassword: null, newPassword: null });
      //     setShowToast({ show: true, message, type: null });
      //     toast(message);
      //     await new Promise((resolve) => setTimeout(resolve, 2000));
      //     history.push("/login");
      //   }
    } catch (error) {}
  };

  return (
    <div className="newElement">
      <h1 className="newElementTitle">Logout All</h1>
      <form onSubmit={onSubmit}>
        <br></br>
        <div className="form-row">
          <input type="submit" value="Submit" onClick={onSubmit}></input>
        </div>
        <div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
