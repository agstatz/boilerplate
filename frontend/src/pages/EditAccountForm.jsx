/**
 * RegisterForm.jsx
 * 
 * This form component handles editing of account details
 * of a user. Utilizes redux to store the information
 * TODO: add corresponding database calls
 * 
 * @author Gaurav Manglani
 */

import React from "react";
import { Stack, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// redux imports
import { login } from "../features/userSlice.js";
import store from "../store/store.js";


class EditAccountForm extends React.Component {
    constructor(props) {
        super(props);

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
        // someone should not be able to edit account details
        // that don't meet requirements
        // e.g. min password length, min characters in a
        // username, unique usernames
        
        // update state in redux with new information
        // store.dispatch(login({
        //     email: this.state.email,
        //     password: this.state.password,
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     username: this.state.username
        // }));
        
        // Redirect the user to profile page on submit
        const { history } = this.props;
        if (history) {
            history.push("/profile/" + this.state.username);
        }

        //TODO: refresh page and persist state
    }

    render() {
        const id = this.props.match.params.id;

        return (
        <Container className="d-flex justify-content-center" >
        <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
            <Stack>
                <Container className="d-flex justify-content-center">
                        <h3>Edit Account</h3>
                </Container>
                <Container className="d-flex justify-content-center">
                        <h5>{id}</h5>
                </Container>
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
                        <Form.Control type="lastName" placeholder="Enter your last name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{width: '16.5em'}} controlId="password" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" onChange={this.handleChange} />
                    </Form.Group>
                    <Stack spacing={4}>
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit">Submit</Button>
                        <a href={"/profile/" + id} align="center">Cancel</a>
                    </Stack>
                </Form>
            </Stack>
        </div>
        </ Container>
        );
    }
}

export default withRouter(EditAccountForm);