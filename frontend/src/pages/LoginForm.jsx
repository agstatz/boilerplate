/**
 * LoginForm.jsx
 * 
 * This form component handles the signing in
 * of a user. Utilizes redux to store the information
 * TODO: add corresponding database calls
 * 
 * @author Dawson Smith, Ashton Statz
 */

import React from "react";
import { Stack, Button, Form, Container } from "react-bootstrap";

// redux imports
import { login } from "../features/userSlice.js";
import store from "../store/store.js";

//import { Link } from "react-router-dom";
//import { Grid } from '@mui/material';

export default class LoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            password: "",
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

    handleSubmit = (event) => {
        event.preventDefault();

        store.dispatch(login({
            password: this.state.password,
            username: this.state.username
        }));
        //console.log(this.state);
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" style={{ paddingBottom: '15vh', paddingTop: '5vh'}}>
            <div className="p-5 my-4 mx-5 d-flex justify-content-center bg-light border rounded">
                <Stack>
                    <Container className="d-flex justify-content-center">
                        <h1><i className="bi bi-person-circle" style={{ fontSize: '80px'}}></i></h1>
                    </Container>
                    <Form className="registerFormFields" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3 " style={{width: '15em'}} controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter your username" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{width: '15em'}} controlId="password" >
                        <Form.Label>Enter your password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
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
                    </Grid>*/ }
                    <Stack spacing={4}>
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit">Sign In</Button>
                        <a href="/register" align="center">Need an account? Register here!</a>
                    </Stack>
                </Form>
                </Stack>
                
                
            </div>
        </Container>
        );
    }
}