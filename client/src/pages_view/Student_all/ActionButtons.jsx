/** @format */

import Button from "react-bootstrap/Button";
import { StudentContext } from "../../contexts/StudentContext";
import { useContext } from "react";
import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export default function ActionButtons({ _id }) {
  const { deleteStudent, findStudent, setShowUpdateStudentTable } =
    useContext(StudentContext);
  const history = useHistory();
  const chooseStudent = (studentId) => {
    findStudent(studentId);
    // setShowUpdateStudentTable(true);
    
    history.push("/userdetail");
  };
  return (
    <>
      <button className="userListEdit" onClick={chooseStudent.bind(this, _id)}>
        Edit
      </button>
      <DeleteOutline
        className="userListDelete"
        onClick={deleteStudent.bind(this, _id)}
      />
    </>
  );
}
