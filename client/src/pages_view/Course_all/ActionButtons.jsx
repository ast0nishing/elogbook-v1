/** @format */
// Decoration
import "../Css/elementList.css";
import { DeleteOutline } from "@material-ui/icons";
import Button from "react-bootstrap/Button";
// React 
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// Context
import { CourseContext } from "../../contexts/CourseContext";
export default function ActionButtons({ id }) {
    const { deleteCourse, findCourse, setShowUpdateCourseTable } =
    useContext(CourseContext);
  const history = useHistory();
  const chooseCourse = (courseId) => {
    findCourse(courseId);
    // setShowUpdateStudentTable(true);
    
    history.push("/coursedetail");
  };
  return (
    <>
      <button className="elementListEdit" onClick={chooseCourse.bind(this, _id)}>
        Edit
      </button>
      <DeleteOutline
        className="elementListDelete"
        onClick={deleteCourse.bind(this, _id)}
      />
    </>
  );
}
