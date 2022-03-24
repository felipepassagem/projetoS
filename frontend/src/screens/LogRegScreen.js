import React, { Fragment } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function LogRegScreen() {
  return (
    <Fragment>
      <Row>
        <Col md={3} ></Col>
        <Col md={3} className='pt-5'>
          <Card >
            <Card.Body>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className='pt-5'> 
          <Card>
            <Card.Body>
              <RegisterForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default LogRegScreen;
