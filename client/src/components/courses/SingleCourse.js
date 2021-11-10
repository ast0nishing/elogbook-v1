/** @format */

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SingleCourse = ({ course: { code, name } }) => (
  <Card className="shadow">
    <Card.Body>
      <Card.Title>
        <Row>
          <Col className="text-right">
            <ActionButtons code={code} />
          </Col>
        </Row>
      </Card.Title>
      <Card.Text>{code}</Card.Text>
      <Card.Text>{name}</Card.Text>
    </Card.Body>
  </Card>
);

export default SingleCourse;
