/** @format */

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { CourseContext } from "../../contexts/CourseContext";

const UpdateCourseTable = () => {
  // Contexts
  const {
    courseState: { course },
    showUpdateCourseTable,
    setShowUpdateCourseTable,
    updateCourse,
    setShowToast,
  } = useContext(CourseContext);

  // State
  const [updatedCourse, setUpdatedCourse] = useState(course);

  useEffect(() => setUpdatedCourse(course), [course]);

  const { code, name } = updatedCourse;

  const onChangeUpdatedCourseForm = (event) =>
    setUpdatedCourse({
      ...updatedCourse,
      [event.target.name]: event.target.value,
    });

  const closeDialog = () => {
    setUpdatedCourse(course);
    setShowUpdateCourseTable(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCourse(updatedCourse);
    setShowUpdateCourseTable(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  // const resetAddPostData = () => {
  // 	setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
  // 	setShowAddPostModal(false)
  // }

  return (
    <Modal show={showUpdateCourseTable} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="name"
              name="name"
              value={name}
              onChange={onChangeUpdatedCourseForm}
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

export default UpdateCourseTable;
