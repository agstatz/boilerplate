/**
 * EditLocation.jsx
 *
 * This form component handles editing dining locations.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from 'axios';
import { Stack, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

// redux imports
import { store } from "../store/store.js";

const url = "http://localhost:3001/";
//const diningLocUrl = "/dining-courts/".concat(locName);

class EditLocation extends React.Component {
    constructor(props) {
        super();

        this.state = {
            loading: true,
            locationName: props,
            diningLocUrl: "/dining-courts/".concat(props),
            xPos: "",
            yPos: "",
            occupancy: "",
            courseScheduleId: ""
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.callAPI();
    }

    async callAPI() {
        this.setState({loading : true})
        let response;
        try {
            response = await axios.get(url.concat("api/dining-locations/").concat(this.state.locationName));
        } catch (error) {
            console.log("error")
        } finally {
            this.setState({
                loading : false,
                xPos: response.xPosition,
                yPos: response.yPosition,
                occupancy: response.occupancy,
                courseScheduleId: response.courseSchedule
            })
            this.forceUpdate();
        }
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

        const locationInfo = {
            headers: {
                'Content-Type': 'application/json'
            },
            locationName: "",
            xPos: "",
            yPos: "",
            occupancy: "",
            courseScheduleId: ""
        }
        this.setState({ message: "" })
        var noErr = true
        // TODO: Check invalid inputs
        if (noErr) {
           // TODO: Update info
        }
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" >
        <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
            <Stack>
                <Container className="d-flex justify-content-center">
                        <h3>Edit location</h3>
                </Container>
                <Form className="registerFormFields" onSubmit={this.handleSubmit} align="center">
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='locationName'>
                        <Form.Label>Location Name</Form.Label>
                        <Form.Control type="locationName" placeholder={this.state.locationName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='xPos'>
                        <Form.Label>x Position</Form.Label>
                        <Form.Control type="xPos" placeholder={this.state.xPos} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='yPos'>
                        <Form.Label>y Position</Form.Label>
                        <Form.Control type="yPos" placeholder={this.state.yPos} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='lastName'>
                        <Form.Label>Occupancy</Form.Label>
                        <Form.Control type="occupancy" placeholder={this.state.occupancy} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{width: '16.5em'}} controlId="courseScheduleId" >
                        <Form.Label>Course Schedule Id</Form.Label>
                        <Form.Control type="courseScheduleId" placeholder={this.state.courseScheduleId} onChange={this.handleChange} />
                    </Form.Group>
                    <Stack spacing={4}>
                        <p align="center">{this.state.message}</p>
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleSubmit} type="submit">Update</Button>
                        <a href={this.state.diningLocUrl} align="center">Return to dining location page</a>
                    </Stack>
                </Form>
            </Stack>
        </div>
        </ Container>
        );
    }
}

export default withRouter(EditLocation);