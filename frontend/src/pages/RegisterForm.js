import React from "react";
import { Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';

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
        <div className="p-3 my-4 mx-3 bg-light border rounded">
            <form className="registerFormFields" onSubmit={this.handleSubmit} align="center">
                <Grid container spacing={1} columns={1} justifyContent="center" alignItems="center">
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
                <br/>
                <Stack spacing={4}>
                    <Button className="mx-auto btn btn-primary btn-sm" onClick={this.handleSubmit}>Register</Button>
                    <a href="/Login" align="center">Already have an account? Login here!</a>
                </Stack>
            </form>
        </div>
        );
    }
}