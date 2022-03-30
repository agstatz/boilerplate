/**
 *  DiningIndividual.jsx
 *  Page that displays public meal plans
 * 
 * @author Ashton Statz
 */

 import { Container, Stack, Button } from 'react-bootstrap';
 import { useEffect, useState } from 'react';
 import { useParams } from 'react-router-dom';
 import { store } from '../store/store';
 import axios from "axios";
 
  function DiningIndividual() {
 
     const { name } = useParams();
     const route = "/edit-location/".concat(name);
 
     return (
         <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
             <div className="p-3 my-4 mx-4 bg-light border rounded" >
                 <h3><strong>{name}</strong></h3>
                 <Stack spacing={4}>
                     <div>
                        <div><strong>Granite Grill</strong></div>
                        <div>Breaded Pork Tenderloin</div>
                        <div>Crinkle Cut Fries</div>
                        <div>Hamburger</div>
                        <div>Burger Toppings</div><br />
                    </div>
                    <div>
                        <strong>Heartland Classics</strong>
                        <div>Panko Breaded Fish</div>
                        <div>Tartar Sauce</div>
                        <div>Malt Vinegar Aioli</div>
                        <div>Vegetarian Shepherd Pie</div>
                        <div>Roasted Garlic Herb Fingerling Potatoes</div>
                        <div>Beans Green Whole Frozen</div>
                    </div>
                    <div>
                        <Button className="mb-2 mt-3 btn btn-primary btn-sm" href={route}>Edit Location</Button>
                    </div>
                 </Stack>
             </div>
             
         </Container>
     );
  }
  
  export default DiningIndividual;