import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Button,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../App.css";

function ClientJobs() {
  const [jobs, setJobs] = useState([]);
  const [clientjobs, setClientjobs] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/log_reg", { replace: true });
    }
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/job/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp)
        if(resp.length > 0){
          var temp = []
          for(var i = 0; i < resp.length; i++){
            if(resp[i].client == name){
              temp.push(resp[i])
            }
          }
          setClientjobs(temp)
        }
      })
      .catch((error) => console.log(error));
  }, []);

  

  return (
    <div>
      <Container>
        <Row>
          {clientjobs.map((job, index) => {
            console.log(clientjobs);
            return (
              <Col key={index} sm={12} md={6} lg={4} xl={3} className="pt-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Dr(a): {job.client}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Paciente: {job.client_client}</ListGroupItem>
                    <ListGroupItem>Trabalho: {job.job_type}</ListGroupItem>
                    <ListGroupItem>Preço: {job.price}</ListGroupItem>
                    <ListGroupItem>Entrada: {job.entry_date}</ListGroupItem>
                    <ListGroupItem>Para: {job.date_to_finish}</ListGroupItem>
                    <ListGroupItem
                      variant={job.is_finished ? "success" : "danger"}
                    >
                      Finalizado: {job.is_finished ? "sim" : "não"}
                    </ListGroupItem>
                    <ListGroupItem
                      variant={job.is_payed ? "success" : "danger"}
                    >
                      Pago: {job.is_payed ? "sim" : "não"}
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Text>{job.description}</Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Button className="btn btn-info m-2">Update</Button>

                    <Button className="btn btn-danger m-2">Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ClientJobs;
