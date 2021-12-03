/** @format */

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, role } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.status !== 400) {
        setAlert({ type: "danger", message: loginData.msg });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Control
          as="select"
          defaultValue="admin"
          name="role"
          value={role}
          onChange={onChangeLoginForm}
        >
          <option value="admin">Admin</option>
          <option value="school">School</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </Form.Control>
        <br></br>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
