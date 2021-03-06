/**
 * RegisterForm.jsx
 *
 * This form component handles the registration
 * of a user. Utilizes redux to store the information
 *
 * @author Dawson Smith, Ashton Statz
 */

import React from "react";
import axios from "axios";
import { Stack, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// redux imports
import { store, UpdateForm } from "../store/store.js";

class RegisterForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
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

  // handles submitting the form
  handleSubmit = (event) => {
    // prevent page from reloading
    event.preventDefault();

    // TODO: validate input on the frontend,
    // check the input on the backend, in that
    // someone should not be able to make an account
    // that doesn't meet requirements
    // e.g. min password length, min characters in a
    // username, unique usernames

    const userInfo = {
      headers: {
        "Content-Type": "application/json",
      },
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      email: this.state.email,
    };
    this.setState({ message: "" });
    var noErr = true;
    if (noErr && !/^([a-zA-Z0-9]{4,})$/.test(this.state.username)) {
      this.setState({
        message:
          "Username must be at least 4 characters long and cannot contain symbols",
      });
      noErr = false;
    }
    if (noErr && !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.state.email)) {
      this.setState({ message: "Invalid email" });
      noErr = false;
    }
    if (noErr && !/^([a-zA-Z]{2,})$/.test(this.state.firstName)) {
      this.setState({ message: "Invalid first name" });
      noErr = false;
    }
    if (noErr && !/^([a-zA-Z]{2,})$/.test(this.state.lastName)) {
      this.setState({ message: "Invalid last name" });
      noErr = false;
    }
    if (noErr && !/^([\S]{8,})$/.test(this.state.password)) {
      this.setState({ message: "Password must be at least 8 characters" });
      noErr = false;
    }
    if (noErr) {
      axios
        .post("http://localhost:3001/api/registeruser", { data: userInfo })
        .then((res) => {
          // update state in redux with new information
          store.dispatch(UpdateForm("password", this.state.password));
          store.dispatch(UpdateForm("username", this.state.username));
          store.dispatch(UpdateForm("email", this.state.email));
          store.dispatch(UpdateForm("firstName", this.state.firstName));
          store.dispatch(UpdateForm("lastName", this.state.lastName));
          store.dispatch(UpdateForm("isAdmin", false));
          store.dispatch(UpdateForm("isNotGuest", true));
          store.dispatch(UpdateForm("isModerator", false));
          store.dispatch(UpdateForm("isDiningStaff", false));

          // Redirect the user to initial quiz
          const { history } = this.props;
          if (history) {
            history.push("/preference-quiz");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ message: "Username or email arleady in use" });
        });
    }

    // update state in redux with new information
    /*store.dispatch(UpdateForm(("password"), this.state.password));
        store.dispatch(UpdateForm(("username"), this.state.username));
        store.dispatch(UpdateForm(("email"), this.state.email));
        store.dispatch(UpdateForm(("firstName"), this.state.firstName));
        store.dispatch(UpdateForm(("lastName"), this.state.lastName));*/

    // Redirect the user to initial quiz
    /*const { history } = this.props;
        if (history) {
            history.push("/preference-quiz");
            window.location.reload();
        }*/

    /*store.dispatch(login({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username
        }));*/
  };

  render() {
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
              <h3>Sign Up</h3>
            </Container>
            <Container className="d-flex justify-content-center">
              <h1>
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "80px" }}
                ></i>
              </h1>
            </Container>
            <Form
              className="registerFormFields"
              onSubmit={this.handleSubmit}
              align="center"
            >
              <Form.Group
                className="mb-3 "
                style={{ width: "16.5em" }}
                controlId="username"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter your username"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 "
                style={{ width: "16.5em" }}
                controlId="email"
              >
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 "
                style={{ width: "16.5em" }}
                controlId="firstName"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="firstName"
                  placeholder="Enter your first name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 "
                style={{ width: "16.5em" }}
                controlId="lastName"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lastName"
                  placeholder="Enter your last name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ width: "16.5em" }}
                controlId="password"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Stack spacing={4}>
                <p align="center">{this.state.message}</p>
                <Button
                  className="mb-2 mt-3 btn btn-primary btn-sm"
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Register
                </Button>
                <a href="/Login" align="center">
                  Already have an account? Login here!
                </a>
              </Stack>
            </Form>
          </Stack>
        </div>
      </Container>
    );
  }
}

export default withRouter(RegisterForm);
