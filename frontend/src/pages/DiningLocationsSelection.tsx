import { Container } from 'react-bootstrap';
import { DiningLocationList } from '../components/';
import { Button } from "react-bootstrap";

function DiningLocationsSelection() {
    return (
        <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
            <div className="p-3 my-4 mx-4 bg-light border rounded" >
               <h1><strong>Dining Locations</strong></h1>
               <DiningLocationList filterValue="invalid"/>
               <Button className="mb-2 mt-3 btn btn-primary btn-sm" href="/add-location/">Add a new Location</Button>
            </div>
        </Container>
  );
}

export default DiningLocationsSelection;