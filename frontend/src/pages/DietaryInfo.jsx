/**
 *  Scheduler.tsx
 *  The dietary restriction page for the application.
 *
 * @author Arjan Mobin
 */

 import { Container, Button, Row, Col, Form, Dropdown, DropdownButton } from "react-bootstrap";
 import axios from "axios";
 import { useEffect, useState } from "react";
 import Select from 'react-select'
 import { store } from "../store/store.js";
 
 
 function DietaryInfo(props) {
   
   useEffect(async () => {
     try {
       const { data: response } = await axios.get(
         
       );
       
     } catch (err) {
       console.error(err);
     } 
   }, []);
 

 
   return (
     <Container style={{ paddingTop: "15vh", paddingBottom: "15vh" }}>
       <div className="p-3 my-4 mx-4 bg-light border rounded">
         <h1><strong>Dietary Info</strong></h1><br />
         <div>
           <Form>
             <Form.Group
               as={Row}
               className="mb-3"
               controlId="formHorizontalEmail"
             >
               <Form.Label column sm={6}>
                 <h3>Meal Schedule Name:</h3>
               </Form.Label>
               <Col sm={4}>
                 <Form.Control type="text" placeholder="My Healthy Meal Plan" onChange={(e) => {

                }}/>
               </Col>
             </Form.Group>
             {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
               (day, i) => {
                 return;
               }
             )}
           <Form.Check
             type="checkbox"
             label="Private"
             onChange={(e) => {
               
             }}
           />
           
           </Form>
           
         </div>
         <Row>
         <Col md={10} sm={9} xs={8}>
         </Col>
         <Col md={2} sm={3} xs={4}>
         </Col>
         </Row>
         
       </div>
     </Container>
   );
 }
 
 export default DietaryInfo;
 