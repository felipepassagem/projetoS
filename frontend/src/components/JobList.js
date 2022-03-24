import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
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
import '../App.css'

function JobList() {
  const [jobs, setJobs] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate('/log_reg', {replace: true})
    }
  })

  useEffect(() => {
    fetch("http://localhost:8000/api/job/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setJobs(resp))
      .catch((error) => console.log(error));
  }, []);

  //if(jobs.length > 0)
      //  {
        //  var c_jobs = jobs.filter( element => element.client == name)
          //setClientjobs(c_jobs)
          //console.log(c_jobs)
        //}

  const handleDelete = (id) => {
    if(window.confirm('Deseja realmente excluir')) {
      fetch(`http://localhost:8000/api/job/${id}/`, {
      method: "Delete",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((resp) => resp.json())
    .catch((error) => error)
    .then(fetch("http://localhost:8000/api/job/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((resp) => resp.json())
    .then((resp) => setJobs(resp))
    .then(navigate('/joblist'))
    )
      }
  }

  const handleUpdate = (id) => {
    navigate(`/job/${id}`)
  }

  return (
    <div>
      <Container>
        <Row>
          {jobs.map((job, index) => {
            return (
              <Col key={index} sm={12} md={6} lg={4} xl={3} className="pt-3">
                <Card style={{ width: "18rem"}}  >
                  <Card.Body>
                    <Card.Title >Dr(a): {job.client}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Paciente: {job.client_client}</ListGroupItem>
                    <ListGroupItem>Trabalho: {job.job_type}</ListGroupItem>
                    <ListGroupItem>Preço: {job.price}</ListGroupItem>
                    <ListGroupItem>Entrada: {job.entry_date}</ListGroupItem>
                    <ListGroupItem>Para: {job.date_to_finish}</ListGroupItem>
                    <ListGroupItem variant={job.is_finished ? "success" : "danger"}>Finalizado: {job.is_finished ? 'sim' : 'não' } {job.is_finished ? job.finish_date : ""}</ListGroupItem>
                    <ListGroupItem variant={job.is_payed ? "success" : "danger"}>Pago: {job.is_payed ? 'sim' : 'não' }</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Text >{job.description}</Card.Text>
                  </Card.Body>
                  <Card.Body>
                  
                    <Button className="btn btn-info m-2" onClick={() => handleUpdate(job.id)}>Update</Button>
                  
                    <Button className="btn btn-danger m-2" onClick={() => handleDelete(job.id)}>Delete</Button>
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

export default JobList;
