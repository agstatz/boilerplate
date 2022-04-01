/**
 * AdminPanel.jsx
 *
 * Index page for admin pages and utilities.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from "axios";
import { Stack, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { store } from "../store/store.js";
import UnauthorizedAccess from "../components/UnauthorizedAccess";
const url = "http://localhost:3000/";
const diningLocationSelectionUrl = url.concat("dining-location-selection");


class AdminPanel extends React.Component {
  constructor() {
    super();
  }
  render() {
    if (store.getState().app.isAdmin !== true) {
      return(<UnauthorizedAccess />);
    }
    return (
      <Container
        style={{
          paddingTop: "8vh",
          paddingBottom: "40vh",
        }}
      >

        <Container></Container>
        <div className="p-5 my-4 mx-3 mt-5 d-flex justify-content-center bg-light border rounded">
          <Stack>
            <Container className="d-flex justify-content-center">
              <h1><strong>Admin Panel</strong></h1>
            </Container>
            <Container
              className="d-flex justify-content-center"
              style={{
                paddingTop: "1vh",
                paddingLeft: "24vh",
                paddingRight: "24vh",
              }}
            >
              <Stack spacing={4}>
                <Button
                  className="mb-2 mt-3 btn btn-primary btn-sm"
                  href={diningLocationSelectionUrl}
                >
                  Edit Dining Locations
                </Button>
              </Stack>
            </Container>
            <Container
              className="d-flex justify-content-center"
              style={{
                paddingTop: "2vh",
                paddingLeft: "6vh",
                paddingRight: "6vh",
              }}
            >
              <p> More to be added ... </p>
            </Container>
          </Stack>
        </div>
      </Container>
    );
  }
}

export default withRouter(AdminPanel);
