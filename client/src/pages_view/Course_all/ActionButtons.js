/** @format */
// Decoration
import "../Css/elementList.css";
import { DeleteOutline } from "@material-ui/icons";
// React
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// Context
import { CourseContext } from "../../contexts/CourseContext";
export default function ActionButtons(code) {
  const {
    courseState: { course, courses, coursesLoading },
    deleteCourse,
    findCourse,
    setShowUpdateCourseTable,
  } = useContext(CourseContext);
  const history = useHistory();
  // Select course for editing
  const chooseCourse = (courseId) => {
    findCourse(courseId);
    history.push("/coursedetail");
  };
  // Delete course

  const removeCourse = (courseId) => {
    deleteCourse(courseId);
  };
  return (
    <>
      <button
        className="elementListEdit"
        onClick={chooseCourse.bind(this, code)}
      >
        Edit
      </button>
      <DeleteOutline
        className="elementListDelete"
        onClick={deleteCourse.bind(this, code)}
      />
    </>
  );
}
