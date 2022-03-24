import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import APIService from "../APIServices";
import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const cookies = new Cookies();

  const navigate = useNavigate()

  const registerBtn = () => {
    if(password === confirmation) {
      APIService.RegisterUser({username, password})
      .then(resp => console.log(resp))
      .catch(error => console.log(error))
      navigate('/log_reg')
    } else {
      navigate('/log_reg')
      alert('password didnt match')
    }
    
  }

  useEffect(() => {
    cookies.remove('mycookie')
  }, []) 

  return (
    <div>

          <h2>Register account</h2>
          <Form onSubmit={registerBtn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                id='username'
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                id='password'
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                id='confirm'
                type="password"
                name="confirmation"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant="primary" >
              Submit
            </Button>
          </Form>

    </div>
  );
}

export default RegisterForm;
