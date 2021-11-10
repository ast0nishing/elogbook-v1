/** @format */

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const AddCourseTable = () => {
  // Contexts
  const { showAddCourseTable, setShowAddCourseModal, addCourse, setShowToast } =
    useContext(CourseContext);

  // State
  const [newCourse, setNewCourse] = useState({
    name: "",
  });

  const { name } = newCourse;

  const onChangeNewCourseForm = (event) =>
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddCourseData();
  };

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   const { success, message } = await addCourse(newCourse);
  //   resetAddCourseData();
  //   setShowToast({ show: true, message, type: success ? "success" : "danger" });
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCourse(newCourse);
    resetAddCourseData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddCourseData = () => {
    setNewCourse({ name: "" });
    setShowAddCourseModal(false);
  };

  return (
    <Modal show={showAddCourseTable} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="name"
              placeholder="Course name"
              name="name"
              value={name}
              onChange={onChangeNewCourseForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCourseTable;
