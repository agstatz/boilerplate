/**
 *  Scheduler.tsx
 *  The scheduler page for the application.
 * 
 * @author Arjan Mobin
 */

 import { Container, Button } from 'react-bootstrap';
 import Calendar from 'react-calendar';

 function Scheduler() {
   return (
       <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
        <div className="p-3 my-4 mx-4 bg-light border rounded" >
            <h1 className="text-center">
                <br />
                <br />
                <p>Select a date to schedule a meal</p>
                <Calendar />
                <br />
                <br />
                <br />
            </h1>
        </div>
        <Button className="mx-auto btn btn-primary btn-sm" href="/">Home</Button>
        </Container>
   );
 }
 
 export default Scheduler;