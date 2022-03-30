/**
 * EditLocation.jsx
 *
 * This form component handles editing dining locations.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from 'axios';
import { Stack, Button, Container, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import UnauthorizedAccess from "../components/UnauthorizedAccess"

// redux imports
import { store } from "../store/store.js";
import { useParams, useHistory } from 'react-router-dom';

const url = "http://localhost:3001/";

class EditLocation extends React.Component {
    constructor(props) {
        super();

        this.state = {
            loading: true,
            locationName: props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1),
            newName: props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1),
            diningLocUrl: "/dining-courts/".concat(props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1)),
            xPos: "",
            yPos: "",
            occupancy: "",
            hidden: "",
            courseScheduleId: "",
            showModal: false,
            isAdmin: store.getState().app.isAdmin
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        if (this.state.isAdmin === true) {
            this.callAPI();
        }
    }

    async callAPI() {
        this.setState({loading : true})
        let response;
        try {
            response = await axios.get(url.concat("api/dining-locations/").concat(this.state.locationName));
        } catch (error) {
            console.log("error");
        } finally {
            this.setState({
                loading : false,
                xPos: response.data.xLocation,
                yPos: response.data.yLocation,
                hidden: response.data.hidden,
                courseScheduleId: response.data.courseScheduleId
            });
            console.log(response);
            this.forceUpdate();
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.id;
        this.setState({
            [name]: value
        });
    }

    handleCheck = (event) => {
        this.setState({
            hidden: event.target.checked
        });
    }

    handleClose = (event) => {
        this.setState({
            showModal: false
        });
    }

    handleOpen = (event) => {
        this.setState({
            showModal: true
        });
    }

    handleSubmitDelete = (event) => {
        this.setState({ message: "" });
                    axios
                        .delete("http://localhost:3001/api/dining-locations/".concat(this.state.locationName), { name: this.state.locationName })
                        .then((res) => {
                            window.location.replace('/dining-location-selection');
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({ message: "Error encountered during delete" });
                        })
    }

    // handles submitting the form
    handleSubmit = (event) => {
        // prevent page from reloading
        event.preventDefault();
        this.setState({ message: "" })
        const locationInfo = {
            headers: {
                'Content-Type': 'application/json'
            },
            locationName: this.state.newName,
            xPos: this.state.xPos,
            yPos: this.state.yPos,
            hidden: this.state.hidden,
            courseScheduleId: this.state.courseScheduleId
        }
        this.setState({ message: "" })
        var noErr = true
        if (noErr && !/^([0-9]{1,})$/.test(this.state.xPos)) {
            this.setState({ message: "x Position must be a positive number" })
            noErr = false
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.yPos)) {
            this.setState({ message: "y Position must be a positive number" })
            noErr = false
        }
        if (noErr && !/^(\S{1,}.*\S{1,})$/.test(this.state.newName)) {
            this.setState({ message: "Location name is invalid" })
            noErr = false
        }
        if (noErr && !(this.state.newName.valueOf() == this.state.locationName.valueOf())) {
            axios
                .get("http://localhost:3001/api/dining-locations/".concat(this.state.newName), { data: locationInfo })
                .then((res) => {
                    this.setState({ message: "Location name already exists" });
                    noErr = false;
                })
                .catch(err => {
                    // do nothing
                })
        }
        if (noErr && !/^([\S]{2,})$/.test(this.state.courseScheduleId)) {
            this.setState({ message: "Schedule ID is invalid" })
            noErr = false
        }
        // TODO: check schedule id exists
        if (noErr) {
            axios
                .put("http://localhost:3001/api/dining-locations/".concat(this.state.locationName), { data: locationInfo })
                .then((res) => {
                    const { history } = this.props;
                    if (history) {
                        history.push("/dining-location-selection");
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ message: "Error encountered during update" })
                })
        }
    }

    render() {
        if (this.state.isAdmin === true){
            return (
                <Container className="d-flex justify-content-center" style={{ paddingTop: '10vh', paddingBottom: '2vh', paddingLeft: '55vh', paddingRight: '55vh'}} >
                    <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
                        <Stack>
                            <Container className="d-flex justify-content-center">
                                    <h3>Edit location</h3>
                            </Container>
                            <Form className="registerFormFields" onSubmit={this.handleSubmit} align="center">
                                <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='newName'>
                                    <Form.Label>New Location Name</Form.Label>
                                    <Form.Control type="newName" value={this.state.newName} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='xPos'>
                                    <Form.Label>New x Position</Form.Label>
                                    <Form.Control type="xPos" value={this.state.xPos} onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='yPos'>
                                    <Form.Label>New y Position</Form.Label>
                                    <Form.Control type="yPos" value={this.state.yPos} onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" style={{width: '16.5em'}} controlId="courseScheduleId" >
                                    <Form.Label>New Course Schedule Id</Form.Label>
                                    <Form.Control type="courseScheduleId" value={this.state.courseScheduleId} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{width: '16.5em'}} controlId="hidden" >
                                    <Form.Check type="switch" id="hidden-opt" label="Hidden" onChange={this.handleCheck} checked={this.state.hidden}/>
                                </Form.Group>
                                <Stack spacing={4}>
                                    <p align="center">{this.state.message}</p>
                                    <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit">Update</Button>
                                </Stack>
                            </Form>
                            <Stack spacing={4}>
                                <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleOpen} type="delete">Delete this location</Button>
                            </Stack>
                            <Stack spacing={4}>
                                <a href={this.state.diningLocUrl} align="center">Return to dining location page</a>
                            </Stack>
                            <Stack spacing={4}>
                                <a href="/dining-location-selection/" align="center">Return to dining selection page</a>
                            </Stack>
                            <Modal show={this.state.showModal} onHide={this.handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Warning!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>You are about to permanently delete this dining location. Are you sure you want to do this?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={this.handleSubmitDelete}>Confirm Delete</Button>
                                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </Stack>
                    </div>
                </ Container>
            );
        }
        else {
            return (<UnauthorizedAccess />);
        }
    }
}

export default EditLocation;