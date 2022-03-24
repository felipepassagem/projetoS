import React, { Fragment } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import ClientReg from '../components/ClientReg'


function ClientRegScreen() {
  return (
    <div>
    <Row>
    <Col md={4}></Col>
    <Col md={4}>
      <ClientReg></ClientReg>
    </Col>
    <Col md={4}></Col>
    </Row>
      
    </div>
  )
}

export default ClientRegScreen