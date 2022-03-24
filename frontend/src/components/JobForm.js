import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import APIService from "../APIServices";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();
  const [apiclients, setApiClients] = useState([]); //state to handle api call
  //form states
  const [client, setClient] = useState("");
  const [clientobj, setClientobj] = useState("");
  const [patient, setPatient] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dateToFinish, setDateToFinish] = useState("");
  const [finished, setFinished] = useState("");
  const [isPayed, setIsPayed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [body, setBody] = useState({
    client_client: patient,
    job_type: job,
    description: description,
    price: price,
    date_to_finish: dateToFinish,
    finish_date: finished,
    is_finished: isFinished,
    is_payed: isPayed,
  });

  let ObjValesList = Object.values(apiclients);

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

  const Add_Job = (e) => {
    e.preventDefault();
    APIService.AddJob(
      {
        client: client,
        client_client: patient,
        job_type: job,
        description: description,
        price: price,
        date_to_finish: dateToFinish,
        finish_date: finished,
        is_finished: isFinished,
        is_payed: isPayed,
      },
      token,
      clientobj[0]
    );
    navigate("/joblist", {reaplace: true})
  };

  useEffect(() => {
    for (let i = 0; i <= apiclients.length; i++) {
      let obj = ObjValesList[i];
      if (typeof obj !== "undefined" && obj["name"] === client) {
        setClientobj(obj);
      }
    }
  }, [client]);

  return (
    <div>
      <h2>Novo Trabalho</h2>
      <Form onSubmit={Add_Job}>
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
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trabalho:</Form.Label>
          <Form.Control
            type="text"
            name="job"
            id="job"
            value={job}
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
            value={dateToFinish}
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
            value={finished}
            onChange={(e) => setFinished(e.target.value)}
          />
        </Form.Group>

        <Form.Check
          type="switch"
          id="custom"
          label="Terminado?"
          value={isFinished}
          onClick={() => {
            if (isFinished === false) {
              setIsFinished(true);
              console.log(isFinished);
            } else {
              setIsFinished(false);
              console.log(isFinished);
            }
          }}
        />
        <br></br>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Pago?"
          value={isPayed}
          onClick={() => {
            if (isPayed === false) {
              setIsPayed(true);
              console.log(isPayed);
            } else {
              setIsPayed(false);
              console.log(isPayed);
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

export default AddJob;
