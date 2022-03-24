import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import APIService from "../APIServices";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";

function JobUpdate() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();
  const [apiclients, setApiClients] = useState([]); //state to handle api call
  //form states
  const [client, setClient] = useState("");
  const [clientobj, setClientobj] = useState("");
  const [client_client, setClientClient] = useState("");
  const [job_type, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date_to_finish, setDateToFinish] = useState("");
  const [finish_date, setFinished] = useState("");
  const [is_payed, setIsPayed] = useState(false);
  const [is_finished, setIsFinished] = useState(false);
  const [varp, setVarp] = useState("false");
  const { id } = useParams();

  useEffect(() => {
    if (!token || token == "undefined") {
      navigate("/log_reg");
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
      .then((resp) => setApiClients(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/job/${id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setClient(resp.client);
        setClientClient(resp.client_client);
        setJob(resp.job_type);
        setDescription(resp.description);
        setPrice(resp.price);
        setDateToFinish(resp.date_to_finish);
        setFinished(resp.finish_date);
        setIsFinished(resp.is_finished);
        setIsPayed(resp.is_payed);
      })

      .catch((error) => console.log(error));
  }, []);

  const handleUpdateJob = () => {
    APIService.UpdateJob(
      {
        client,
        client_client,
        price,
        job_type,
        date_to_finish,
        finish_date,
        is_finished,
        is_payed,
        description,
      },
      token,
      id
    )
      .then(navigate("/joblist", { replace: true }))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (is_finished === true) {
      var element = document.getElementById("custom");
      element.setAttribute("checked", true);
    }

    if (is_payed === true) {
      var element = document.getElementById("custom-switch");
      element.setAttribute("checked", true);
    }
  });

  return (
    <div>
      <Form onSubmit={() => handleUpdateJob()}>
        <Form.Group className="mb-3" required>
          <Form.Label>Dr(a):</Form.Label>
          <Form.Control
            as="select"
            name="client"
            id="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          >
            <option value="" disabled>
              Escolha um:
            </option>
            {apiclients.map((client, index) => {
              return (
                <option key={index} value={client.name}>
                  {client.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Paciente:</Form.Label>
          <Form.Control
            type="text"
            name="patient"
            id="patient"
            value={client_client}
            onChange={(e) => setClientClient(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trabalho:</Form.Label>
          <Form.Control
            type="text"
            name="job"
            id="job"
            value={job_type}
            onChange={(e) => setJob(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição: </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço:</Form.Label>
          <Form.Control
            required
            placeholder="10,00"
            type="number"
            name="price"
            id="price"
            min="0"
            step=".01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Previsão de entrega:</Form.Label>
          <Form.Control
            required
            type="date"
            name="date_to_finish"
            id="date_to_finish"
            value={date_to_finish}
            onChange={(e) => setDateToFinish(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de entrega:</Form.Label>
          <Form.Control
            required
            type="date"
            name="finished"
            id="finished"
            value={finish_date}
            onChange={(e) => setFinished(e.target.value)}
          />
        </Form.Group>

        <Form.Check
          type="switch"
          id="custom"
          label="Terminado?"
          value={is_finished}
          onClick={() => {
            if (is_finished === false) {
              setIsFinished(true);
            } else {
              setIsFinished(false);
            }
          }}
        />
        <br></br>

        <Form.Check
          type="switch"
          id="custom-switch"
          label="Pago?"
          value={is_payed}
          onClick={() => {
            if (is_payed === false) {
              setIsPayed(true);
            } else {
              setIsPayed(false);
            }
          }}
        />

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default JobUpdate;
