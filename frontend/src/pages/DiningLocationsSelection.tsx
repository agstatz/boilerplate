import { Container } from "react-bootstrap";
import { DiningLocationList } from "../components/";
import { Button } from "react-bootstrap";
import { store } from "../store/store.js";
import UnauthorizedAccess from "../components/UnauthorizedAccess";

function DiningLocationsSelection() {
  if (store.getState().app.isAdmin === true) {
    return (
      <Container style={{ paddingTop: "12vh", paddingBottom: "6vh" }}>
        <div className="p-3 my-4 mx-4 bg-light border rounded">
          <h1>
            <strong>Dining Locations</strong>
          </h1>
          <DiningLocationList filterValue="invalid" />
          <Button
            className="mb-2 mt-3 btn btn-primary btn-sm"
            href="/add-location/"
          >
            Add a new Location
          </Button>
        </div>
      </Container>
    );
  } else {
    return <UnauthorizedAccess />;
  }
}

export default DiningLocationsSelection;
