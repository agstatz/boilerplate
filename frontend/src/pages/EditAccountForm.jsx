/**
 * RegisterForm.jsx
 * 
 * This form component handles editing of account details
 * of a user. Utilizes redux to store the information
 * 
 * @author Gaurav Manglani
 */

// React imports
import React from "react";
import axios from 'axios';
import { Stack, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// File imports
import { FormErrors } from "../components/FormErrors.js";

// redux imports
import { store, UpdateForm } from "../store/store.js";

class EditAccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            username: "",
            light: false,
            oldUsername: props.match.params.id,
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
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
        },
        () => { this.validateField(name, value) });
    }

    // handles submitting the form
    handleSubmit = (event) => {
        // prevent page from reloading
        event.preventDefault();

        const userInfo = {
            oldUsername: this.state.oldUsername,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            light: this.state.light
        }

        axios
            .post('http://localhost:3001/api/editUser', { data: userInfo })
            .then((res) => {
                return res.redirect('/');
            })
            .catch(err => {
                this.setState({ message: "err" })
            });
        
        store.dispatch(UpdateForm(("password"), this.state.password));
        store.dispatch(UpdateForm(("username"), this.state.username));
        store.dispatch(UpdateForm(("email"), this.state.email));
        store.dispatch(UpdateForm(("password"), this.state.password));
        store.dispatch(UpdateForm(("firstName"), this.state.firstName));
        store.dispatch(UpdateForm(("lastName"), this.state.lastName));
        store.dispatch(UpdateForm(("light"), this.state.light));

            
        const { history } = this.props;
        if (history) {
            history.push(`/profile/${this.state.username}`);
            window.location.reload();
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            // email needs to be a valid email (matches the below regex)
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            // password needs to have 6 or more characters
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" >
        <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
            <Stack>
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} /></div>
                <Container className="d-flex justify-content-center">
                        <h3>Edit Account</h3>
                </Container>
                <Container className="d-flex justify-content-center">
                        <h5>{this.state.oldUsername}</h5>
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
                    <Form.Group className="mb-3" style={{width: '16.5em'}} controlId="light" >
                        <Form.Label>Prefers Light Mode?</Form.Label>
                        <Form.Check onChange={this.handleChange}/>
                    </Form.Group>
                    <Stack spacing={4}>
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit" disabled={!this.state.formValid}>Submit</Button>
                        <a href={"/profile/" + this.state.oldUsername} align="center">Cancel</a>
                    </Stack>
                </Form>
            </Stack>
        </div>
        </ Container>
        );
    }
}

export default withRouter(EditAccountForm);