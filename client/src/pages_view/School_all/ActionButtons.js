/** @format */

import Button from "react-bootstrap/Button";
import { SchoolContext } from "../../contexts/SchoolContext";
import { useContext } from "react";
import "../Student_all/userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export default function ActionButtons({ _id }) {
  const { deleteSchool, findSchool, setShowUpdateSchoolTable } =
    useContext(SchoolContext);
  const history = useHistory();
  const chooseSchool = (schoolId) => {
    findSchool(schoolId);
    // setShowUpdateStudentTable(true);

    history.push("/schooldetail");
  };
  return (
    <>
      <button className="userListEdit" onClick={chooseSchool.bind(this, _id)}>
        Edit
      </button>
      <DeleteOutline
        className="userListDelete"
        onClick={deleteSchool.bind(this, _id)}
      />
    </>
  );
}
