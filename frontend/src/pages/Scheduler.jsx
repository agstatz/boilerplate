/**
 *  Scheduler.tsx
 *  The scheduler page for the application.
 *
 * @author Arjan Mobin
 */

import { Container, Button, Row, Col, Form, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { store } from "../store/store.js";


function Scheduler(props) {
  const [foods, setFoods] = useState([{}]);
  const [mealPlan, setMealPlan] = useState({});
  useEffect(async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/foods"
      );
      setFoods(response);
      setMealPlan({owner: store.getState().app.username, likes: 0, private: false, name: "My Meal Plan"});

      
    } catch (err) {
      console.error(err);
    } 
  }, []);

  function submit_plan(e){
    axios
      .post("http://localhost:3001/api/meal-plans", { data: mealPlan })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function form_column(day) {
    return (
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Col sm={4}>
          <Form.Label column sm={2}>
            <h2>{day}</h2>
          </Form.Label>
        </Col>
        <Form.Label column sm={2}>
          <h3>Food:</h3>
        </Form.Label>
        <Col sm={4}>
          <Select 
            options={Object.keys(foods).map((key, i) => {
            return {value: foods[key]._id, label: foods[key].name}
            })}
            onChange={(e) => {
              setMealPlan({...mealPlan, schedule: {...mealPlan['schedule'], [day]: {id: e.value, name: e.label}}})
              console.log(mealPlan)
            }}
          />
        </Col>
      </Form.Group>
    );
  }

  return (
    <Container style={{ paddingTop: "15vh", paddingBottom: "15vh" }}>
      <h1>Schedule</h1>
      <div className="p-3 my-4 mx-4 bg-light border rounded">
        <h2>Add Meals</h2>
        <div>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={3}>
                <h3>Meal Schedule Name:</h3>
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" placeholder="healthy" onChange={(e) => {
                  setMealPlan({...mealPlan, name: e.target.value})
                }}/>
              </Col>
            </Form.Group>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day, i) => {
                return form_column(day);
              }
            )}
          <Form.Check
            type="checkbox"
            label="Private"
            onChange={(e) => {
              setMealPlan({...mealPlan, private: e.target.checked})
            }}
          />
          <Button variant="primary" type="submit" onSubmit={submit_plan}>Submit Schedule</Button>
          </Form>
        </div>
      </div>

      <Button className="mx-auto btn btn-primary btn-sm" href="/">
        Home
      </Button>
    </Container>
  );
}

export default Scheduler;
