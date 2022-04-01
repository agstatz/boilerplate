import { Container, Stack } from "react-bootstrap";

import { store } from "../store/store";

function UnauthorizedAccess() {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{
        paddingTop: "10vh",
        paddingBottom: "2vh",
        paddingLeft: "30vh",
        paddingRight: "30vh",
      }}
    >
      <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
        <Stack>
          <div>
            <h3>Sorry!</h3>
            <p>
              Your account does not have the required permissions to access the
              contents of this page.
            </p>
          </div>
        </Stack>
      </div>
    </Container>
  );
}

export default UnauthorizedAccess;
