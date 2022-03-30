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
import GuestUserRedirect from "../components/GuestUserRedirect"


function Scheduler(props) {
  const [foods, setFoods] = useState([{}]);
  const [mealPlan, setMealPlan] = useState({});
  useEffect(async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/foods"
      );
      setFoods(response);
      setMealPlan({owner: store.getState().app.username, likes: 0, private: false, name: "My Meal Plan", schedule: []});
    } catch (err) {
      console.error(err);
    } 
  }, []);

  function submit_plan(){
    let plan = {};
    for (const [key, value] of Object.entries(mealPlan)) {
      if (key != 'schedule') {
        plan[key] = mealPlan[key];
      }
      let foods = []
      for (const [day, food] of Object.entries(mealPlan.schedule)) {
        foods.push({food: food, day: day, });
      }

      plan['schedule'] = foods;
    }

    console.log(plan)
  

    axios
      .post("http://localhost:3001/api/meal-plans", plan)
      .then((res) => {
        console.log('plan submitted');
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
    if (store.getState().app.isNotGuest !== true) {
      return(<GuestUserRedirect />);
    }
    else {
      return (
        <Container style={{ paddingTop: "15vh", paddingBottom: "15vh" }}>
          <div className="p-3 my-4 mx-4 bg-light border rounded">
            <h1><strong>Schedule a Meal Plan</strong></h1><br />
            <div>
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={6}>
                    <h3>Meal Schedule Name:</h3>
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control type="text" placeholder="My Healthy Meal Plan" onChange={(e) => {
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

              </Form>

            </div>
            <Row>
            <Col md={10} sm={9} xs={8}>
            </Col>
            <Col md={2} sm={3} xs={4}>
                <Button variant="primary" type='Button' className="float-right" onClick={submit_plan}>Submit <i className="bi bi-chevron-right"></i></Button>
            </Col>
            </Row>

          </div>
        </Container>
      );
  }
}

export default Scheduler;
