import React, { useEffect, useState } from "react";
import {  Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import APIService from "../APIServices";

function ClientReg() {
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("+55");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  

  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();



  useEffect(() => {
    if (!token || token === "undefined") {
      navigate("/log_reg");
    }
  });

  const regClient = () => {
    APIService.AddClient({ name, phone_number, email, description, address, city}, token)
    .catch(error => console.log(error))
  };



  return (
    <div>
      <h2>Register Client</h2>
      <Form onSubmit={regClient}>
        <Form.Group className="mb-3">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefone:</Form.Label>
          <Form.Control
            id="phone"
            type="phone"
            name="phone"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control id="email" type="email" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Cidade:</Form.Label>
          <Form.Control id="city" type="text" name="city" value={city} required
                onChange={(e) => setCity(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Endereço:</Form.Label>
          <Form.Control id="address" type="text" name="address" value={address}
                onChange={(e) => setAddress(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Obs:</Form.Label>
          <Form.Control id="desc" as="textarea" rows={5} name="desc" value={description}
                onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

export default ClientReg;
