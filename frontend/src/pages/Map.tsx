/**
 *  Map.tsx
 *  The map page, which displays a map of the
 *  dining courts around campus
 * 
 * @author Ashton Statz
 */

import { Container } from "react-bootstrap";
import map_img from "../assets/Purdue-Dining-Map_20210813.jpg";

 function Map() {
   return (
       <Container style={{ paddingTop: '12vh', paddingBottom: '15vh'}}>
         <div className="p-3 my-4 mx-4 bg-light border rounded">
             <h1><strong>Dining Map - Purdue University</strong></h1>
             <img className="mw-100" alt="Purdue Dining Map (did not load)" src={map_img}></img>
         </div>

     </Container>
   );
 }
 
 export default Map;
 