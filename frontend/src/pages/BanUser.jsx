/**
 * EditLocation.jsx
 *
 * This form component handles editing dining locations.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from "axios";
import { Stack, Button, Container, Form, Modal } from "react-bootstrap";
import UnauthorizedAccess from "../components/UnauthorizedAccess";
 
// redux imports
import { store } from "../store/store.js";
 
const url = "http://localhost:3001/";
 
class BanUser extends React.Component {
    constructor(props) {
        super();

        this.state = {
        username: props.location.pathname.substring(
            props.location.pathname.lastIndexOf("/") + 1
        ),
        linkUsername: props.location.pathname.substring(
            props.location.pathname.lastIndexOf("/") + 1
        ),
        reason: "",
        message: "",
        admin: store.getState().app.username,
        showModal: false,
        isAdmin: store.getState().app.isAdmin,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
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

    handleClose = (event) => {
        this.setState({
            showModal: false,
        });
    };

    handleOpen = (event) => {
        this.setState({
            showModal: true,
        });
    };

    // handles submitting the form
    handleSubmit = (event) => {
        // prevent page from reloading
        event.preventDefault();
        this.setState({ message: "" });
        const banInfo = {
            headers: {
                "Content-Type": "application/json",
            },
            username: this.state.username,
            admin: this.state.admin,
            reason: this.state.reason
        };
        var noErr = true;
        // INPUT ERROR CHECKING ADD AS NEEDED
        if (noErr) {
            axios
                .post("http://localhost:3001/api/users/ban/", { data: banInfo })
                    .then((res) => {
                    const { history } = this.props;
                    if (history) {
                        history.push("/dining-location-selection");
                        window.location.reload();
                    }
                })
                    .catch((err) => {
                    console.log(err.response.data.msg);
                    this.setState({ message: err.response.data.msg });
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
                    <h3>Ban User "{this.state.username}"?</h3>
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
                    <Form.Label>User to Ban</Form.Label>
                    <Form.Control
                        type="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3 "
                    style={{ width: "16.5em" }}
                    controlId="reason"
                    >
                    <Form.Label>Reason for Ban</Form.Label>
                    <Form.Control
                        type="reason"
                        as="textarea"
                        value={this.state.reason}
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
                        Confirm Ban
                    </Button>
                    </Stack>
                </Form>
                <Stack spacing={4}>
                    <a href="/dining-location-selection/" align="center">
                    Return to {this.state.linkUsername}'s page
                    </a>
                </Stack>
                </Stack>
            </div>
            </Container>
        );
        } else {
        return <UnauthorizedAccess />;
        }
    }
}

export default BanUser;
 