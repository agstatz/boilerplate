import React from "react";
import { Stack, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';

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
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" style={{ paddingBottom: '30vh', paddingTop: '15vh'}}>
            <div className="p-5 my-4 mx-5 d-flex justify-content-center bg-light border rounded">
                <Stack>
                    <Container className="d-flex justify-content-center">
                        <h1><i className="bi bi-person-circle" style={{ fontSize: '80px'}}></i></h1>
                    </Container>
                    <Form className="registerFormFields" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3 " style={{width: '15em'}} controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter your username" />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{width: '15em'}} controlId="formPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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
                        <Button className="mb-2 mx-auto btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit">Sign In</Button>
                        <a href="/register" align="center">Need an account? Register here!</a>
                    </Stack>
                </Form>
                </Stack>
                
                
            </div>
        </Container>
        );
    }
}