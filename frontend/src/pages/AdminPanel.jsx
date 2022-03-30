/**
 * AdminPanel.jsx
 *
 * Index page for admin pages and utilities.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from 'axios';
import { Stack, Button, Container} from "react-bootstrap";
import { withRouter } from "react-router-dom";
const url = "http://localhost:3000/";
const diningLocationSelectionUrl = url.concat("dining-location-selection");

class AdminPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
        <Container className="d-flex justify-content-center" >
        <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
            <Stack>
                <Container className="d-flex justify-content-center">
                        <h3>Admin Panel</h3>
                </Container>
                <Stack spacing={4}>
                   <Button className="mb-2 mt-3 btn btn-primary btn-sm" href={diningLocationSelectionUrl}>Edit Dining Locations</Button>
                </Stack>
            </Stack>
        </div>
        </ Container>
        );
    }
}

export default withRouter(AdminPanel);