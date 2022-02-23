/**
 *  PageNotFound.tsx
 *  Page for when the user gets lost
 * 
 * @author Ashton Statz
 */

import { Container, Button } from 'react-bootstrap';

 function PageNotFound() {
   return (
       <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
        <div className="p-3 my-4 mx-4 bg-light border rounded" >
            <h1 className="text-center">
                <br />
                <br />
                <i className="bi bi-exclamation-octagon"></i> Oops! Page Not Found <i className="bi bi-exclamation-octagon"></i>
                <br /><br />
                <Button className="mx-auto btn btn-primary btn-md" href="/">Home</Button>
                <br />
            </h1>
        </div>
        
        </Container>
   );
 }
 
 export default PageNotFound;