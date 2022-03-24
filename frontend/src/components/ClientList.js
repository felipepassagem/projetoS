import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Card,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function ClientList() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/log_reg", { replace: true });
    }
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/clients/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setClients(resp))
      .then(console.log(clients))
      .catch((error) => console.log(error));
  }, []);

  //updateclient
  const handleUpdate = (id) => {
    navigate(`/client/${id}`)
  }

  const handleClientList = (id) => {
    navigate(`/job_list/${id}`)
  }
  

  const handleDelete = (id) => {
    if(window.confirm('Deseja realmente excluir')) {
      fetch(`http://localhost:8000/api/clients/${id}/`, {
      method: "Delete",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((resp) => resp.json())
    .catch((error) => error)
    .then(fetch("http://localhost:8000/api/clients/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((resp) => resp.json())
    .then((resp) => setClients(resp))
    .then(navigate('/client_list'))
    )
      }
  }
  

  return (
    <div>
      <Container>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {clients.map((client, index) => {
              return (
                
                  <tr key={index}>
                    <td key={client.name} >{client.name}</td>
                    <td key={client.phone_number}>{client.phone_number}</td>
                    <td key={client.city}>{client.city}</td>
                    <td key={client.id}><a><button className="btn btn-info" onClick={() => handleUpdate(client.id)} >Update</button></a>
                    <a><button className="btn btn-danger" onClick={() => handleDelete(client.id)} >Delete</button></a>
                    <a><button className="btn btn-success" onClick={() => handleClientList(client.name)} >Trabalhos</button></a></td>
                  </tr>
                
              );
            })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default ClientList;
