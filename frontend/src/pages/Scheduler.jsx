/**
 *  Scheduler.tsx
 *  The scheduler page for the application.
 *
 * @author Arjan Mobin
 */

import { Container, Button, Row, Col, Form, Dropdown } from "react-bootstrap";
import axios from "axios";
import React from "react";


class Scheduler extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
          foods:[]
        };
    }
    foods = [];

    componentDidMount(){
      this.setState({foods: this.getFoods().data})
      this.forceUpdate();
    }

    async getFoods(){
      return axios.get("http://localhost:3001/api/foods".data)
    }

    
    render(){
      let foods = this.state.foods;
      return [
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
                    <Form.Control type="text" placeholder="healthy" />
                  </Col>
                </Form.Group>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => {
                  return form_column(day);
                })}
              </Form>
              <p>FOOD: {
                Object.entries(this.state.foods).forEach(([key, value]) => {
                  console.log(key)
                  return <p>{value}</p>
                })
                }
              </p>
            </div>
          </div>
  
          <Button className="mx-auto btn btn-primary btn-sm" href="/">
            Home
          </Button>
        </Container>,
      ];

    }
}

function form_column(day) {
  return (
  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      <h3>Day:</h3>
    </Form.Label>
    <Col sm={4}>
      <Form.Label column sm={2}>
        <h2>{day}</h2>
      </Form.Label>
    </Col>
    <Form.Label column sm={2}>
      <h3>Food:</h3>
    </Form.Label>
    <Col sm={4}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select a Food Item
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  </Form.Group>
  )
}

export default Scheduler;
