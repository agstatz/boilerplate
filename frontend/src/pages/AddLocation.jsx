/**
 * AddLocation.jsx
 *
 * This form component handles adding dining locations.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from "axios";
import { Stack, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import UnauthorizedAccess from "../components/UnauthorizedAccess";

// redux imports
import { store } from "../store/store.js";
import { useParams, useHistory } from "react-router-dom";

const url = "http://localhost:3001/";

class AddLocation extends React.Component {
  constructor(props) {
    super();

    this.state = {
      loading: true,
      locationName: props.location.pathname.substring(
        props.location.pathname.lastIndexOf("/") + 1
      ),
      xPos: "0",
      yPos: "0",
      occupancy: "",
      hidden: false,
      courseScheduleId: "623a6cbd3d6c321e10083da3",
      isAdmin: store.getState().app.isAdmin,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.id;

    this.setState({
      [name]: value,
    });
  };

  handleCheck = (event) => {
    this.setState({
      hidden: event.target.checked,
    });
  };

  // handles submitting the form
  handleSubmit = (event) => {
    // prevent page from reloading
    event.preventDefault();

    const locationInfo = {
      headers: {
        "Content-Type": "application/json",
      },
      locationName: this.state.locationName,
      xPos: this.state.xPos,
      yPos: this.state.yPos,
      courseScheduleId: this.state.courseScheduleId,
      hidden: this.state.hidden,
    };
    this.setState({ message: "" });
    var noErr = true;
    if (noErr && !/^([0-9]{1,})$/.test(this.state.xPos)) {
      this.setState({ message: "x Position must be a positive number" });
      noErr = false;
    }
    if (noErr && !/^([0-9]{1,})$/.test(this.state.yPos)) {
      this.setState({ message: "y Position must be a positive number" });
      noErr = false;
    }
    if (noErr && !/^(\S{1,}.*\S{1,})$/.test(this.state.locationName)) {
      this.setState({ message: "Location name is invalid" });
      noErr = false;
    }
    if (noErr && !/^([\S]{2,})$/.test(this.state.courseScheduleId)) {
      this.setState({ message: "Schedule ID is invalid" });
      noErr = false;
    }
    // TODO: check schedule id exists
    if (noErr) {
      axios
        .get(
          "http://localhost:3001/api/dining-locations/".concat(
            this.state.locationName
          ),
          { data: locationInfo }
        )
        .then((res) => {
          this.setState({ message: "Location name already exists" });
          noErr = false;
        })
        .catch((err) => {
          axios
            .post("http://localhost:3001/api/dining-locations/", {
              data: locationInfo,
            })
            .then((res) => {
              this.setState({ message: "Added location successfully" });
            })
            .catch((err) => {
              console.log(err);
              this.setState({ message: "Error encountered during update" });
            });
        });
    }
  };

  render() {
    if (this.state.isAdmin === true) {
      return (
        <Container
          className="d-flex justify-content-center"
          style={{
            paddingTop: "10vh",
            paddingBottom: "2vh",
            paddingLeft: "55vh",
            paddingRight: "55vh",
          }}
        >
          <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
            <Stack>
              <Container className="d-flex justify-content-center">
                <h3>Add location</h3>
              </Container>
              <Form
                className="registerFormFields"
                onSubmit={this.handleSubmit}
                align="center"
              >
                <Form.Group
                  className="mb-3 "
                  style={{ width: "16.5em" }}
                  controlId="locationName"
                >
                  <Form.Label>Location Name</Form.Label>
                  <Form.Control
                    type="locationName"
                    placeholder="Location Name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  style={{ width: "16.5em" }}
                  controlId="xPos"
                >
                  <Form.Label>x Position</Form.Label>
                  <Form.Control
                    type="xPos"
                    value={this.state.xPos}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  style={{ width: "16.5em" }}
                  controlId="yPos"
                >
                  <Form.Label>y Position</Form.Label>
                  <Form.Control
                    type="yPos"
                    value={this.state.yPos}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ width: "16.5em" }}
                  controlId="courseScheduleId"
                >
                  <Form.Label>Course Schedule Id</Form.Label>
                  <Form.Control
                    type="courseScheduleId"
                    value={this.state.courseScheduleId}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ width: "16.5em" }}
                  controlId="hidden"
                >
                  <Form.Check
                    type="switch"
                    id="hidden"
                    label="Hide location from public"
                    checked={this.state.hidden}
                    onChange={this.handleCheck}
                  />
                </Form.Group>
                <Stack spacing={4}>
                  <p align="center">{this.state.message}</p>
                  <Button
                    className="mb-2 mt-3 btn btn-primary btn-sm"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Add Location
                  </Button>
                  <a href="/dining-location-selection/" align="center">
                    Return to dining selection page
                  </a>
                </Stack>
              </Form>
            </Stack>
          </div>
        </Container>
      );
    } else {
      return <UnauthorizedAccess />;
    }
  }
}

export default AddLocation;
