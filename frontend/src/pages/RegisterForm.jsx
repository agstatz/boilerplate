/**
 * RegisterForm.jsx
 * 
 * This form component handles the registration
 * of a user. Utilizes redux to store the information
 * TODO: add corresponding database calls
 * 
 * @author Dawson Smith, Ashton Statz
 */

import React from "react";
import { Stack, Button, Container, Form } from "react-bootstrap";

// redux imports
import { login } from "../features/userSlice.js";
import store from "../store/store.js";

//import { Link } from "react-router-dom";
//import { Grid } from '@mui/material';


export default class RegisterForm extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            username: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.id;

        this.setState({
            [name]: value
        });
    }

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
        
        // update state in redux with new information
        store.dispatch(login({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username
        }));
        console.log(this.state);
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" >
        <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
            <Stack>
                <Container className="d-flex justify-content-center">
                    <h1><i className="bi bi-person-circle" style={{ fontSize: '80px'}}></i></h1>
                </Container>
                <Form className="registerFormFields" onSubmit={this.handleSubmit} align="center">
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter your username" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='firstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="firstName" placeholder="Enter your first name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="lirstName" placeholder="Enter your last name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{width: '16.5em'}} controlId="password" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" onChange={this.handleChange} />
                    </Form.Group>
                    {/*<Grid container spacing={1} columns={1} justifyContent="center" alignItems="center">
                        <Grid item xs={1}>
                            <label className="usernameLabel">
                                Username:
                            </label>
                            </Grid>
                            <Grid item xs={1}>
                            <input
                                type="username"
                                id="username"
                                className="usernameInput"
                                placeholder="Enter your username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={1}>
                        <label className="emailLabel" htmlFor="email">
                            E-Mail Address:
                        </label>
                        </Grid>
                        <Grid item xs={1}>
                        <input
                            type="email"
                            id="email"
                            className="emailInput"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        </Grid>
                        <Grid item xs={1}>
                            <label className="firstNameLabel">
                                First Name:
                            </label>
                            </Grid>
                            <Grid item xs={1}>
                            <input
                                type="firstName"
                                id="firstName"
                                className="firstNameInput"
                                placeholder="Enter your first name"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={1}>
                            <label className="lastNameLabel">
                                Last Name:
                            </label>
                            </Grid>
                            <Grid item xs={1}>
                            <input
                                type="lastName"
                                id="lastName"
                                className="lastNameInput"
                                placeholder="Enter your last name"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={1}>
                        <label className="passwordLabel">
                        Password:
                        </label>
                        </Grid>
                        <Grid item xs={1}>
                        <input
                            type="password"
                            id="password"
                            className="passwordInput"
                            placeholder="Enter your password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        </Grid>
                    </Grid>
                    <br/>*/}
                    <Stack spacing={4}>
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit">Register</Button>
                        <a href="/Login" align="center">Already have an account? Login here!</a>
                    </Stack>
                </Form>
            </Stack>
        </div>
        </ Container>
        );
    }
}