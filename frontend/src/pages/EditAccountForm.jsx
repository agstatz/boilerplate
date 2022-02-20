/**
 * RegisterForm.jsx
 * 
 * This form component handles editing of account details
 * of a user. Utilizes redux to store the information
 * TODO: add corresponding database calls
 * 
 * @author Gaurav Manglani
 */

// React imports
import React from "react";
import { Stack, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// File imports
import { FormErrors } from "../components/FormErrors.js";

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
            username: "",
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

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render() {
        const id = this.props.match.params.id;

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
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit" disabled={!this.state.formValid}>Submit</Button>
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