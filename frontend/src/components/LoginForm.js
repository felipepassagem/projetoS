import React, {useState, useEffect} from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import APIService from "../APIServices";
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const cookies = new Cookies();
  const navigate = useNavigate()

  const loginBtn = () => {
    APIService.LoginUser({username, password})
    .then(resp => cookies.set('mycookie', resp.token))
    .then(setToken(cookies.get('mycookie')))
    .then(navigate('/homescreen', {replace: true}))
    
    .catch(error => console.log(error))
    
  }

  useEffect(() => {
    if(token && token !== 'undefined'){
      try {
        navigate('/joblist', {replace: true})
      } catch (error) {
      }      
    }
  },[token])

  useEffect(() => {
    cookies.remove('mycookie')
  }, []) 

  return (
    <div>
      
        
        
        <h2>Login</h2>
          <Form onSubmit={loginBtn} method="POST"> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label >Username:</Form.Label>
              <Form.Control type="text" name="username" id='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label >Password:</Form.Label>
              <Form.Control type="password" name="password" id='password'  value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
            

            <Button type='submit' variant="primary"  >
              Submit
            </Button>
          </Form>

    </div>
  );
}

export default LoginForm;
