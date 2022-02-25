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
import axios from 'axios';
import { Stack, Button, Form, Container } from "react-bootstrap";

// redux imports
import { store, UpdateForm} from "../store/store.js";

export default class LoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            password: "",
            username: "",
            message: ""
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

        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({ message: "" })
        var noErr = true
        if (noErr && !/^([a-zA-Z]{1,})$/.test(this.state.username)) {
            this.setState({ message: "Username field is empty" })
            noErr = false
        }
        if (noErr && !/^([a-zA-Z]{1,})$/.test(this.state.password)) {
            this.setState({ message: "Password field is empty" })
            noErr = false
        }
        if (noErr) {
            axios
                .post('http://localhost:3001/api/signinuser', { data: userInfo })
                .then((res) => {
                    alert("Hello");
                    store.dispatch(UpdateForm(("password"), this.state.password));
                    store.dispatch(UpdateForm(("username"), this.state.username));
                    const { history } = this.props;
                    if (history) {
                        history.push(`/profile/${this.state.username}`);
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    this.setState({ message: "Your password or username is incorrect" })
                });
        }
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" style={{ paddingBottom: '15vh', paddingTop: '5vh'}}>
            <div className="p-5 my-4 mx-5 d-flex justify-content-center bg-light border rounded">
                <Stack>
                    <Container className="d-flex justify-content-center">
                        <h3>Sign In</h3>
                    </Container>
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
                    <Stack spacing={4}>
                        <p align="center">{this.state.message}</p>
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