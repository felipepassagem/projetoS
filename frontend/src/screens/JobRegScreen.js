import React from 'react'
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import JobForm from '../components/JobForm'

function JobRegScreen() {
  return (
    <div><Row>
    <Col md={4}></Col>
    <Col md={4}>
      <JobForm></JobForm>
    </Col>
    <Col md={4}></Col>
    </Row></div>
  )
}

export default JobRegScreen