/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 * 
 * @author Ashton Statz
 */

import { Container } from 'react-bootstrap';

 function PageNotFound() {
   return (
       <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
        <div className="p-3 my-4 mx-4 bg-light border rounded" >
            <h1 className="text-center">
                <br />
                <br />
                <i className="bi bi-exclamation-octagon"></i> Oops! Page Not Found <i className="bi bi-exclamation-octagon"></i>
                <br />
                <br />
                <br />
            </h1>
        </div>
        </Container>
   );
 }
 
 export default PageNotFound;