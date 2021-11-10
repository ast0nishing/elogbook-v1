/** @format */

import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { CourseContext } from "../../contexts/CourseContext";
import { useContext } from "react";

const ActionButtons = ({ name, code }) => {
  const { deleteCourse, findCourse, setShowUpdateCourseTable } =
    useContext(CourseContext);

  const chooseCourse = (courseId) => {
    findCourse(courseId);
    setShowUpdateCourseTable(true);
  };

  return (
    <>
      <Button className="post-button" onClick={chooseCourse.bind(this, code)}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deleteCourse.bind(this, code)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
