/**
 *  About.tsx
 *  The about page for the application
 * 
 * @author Ashton Statz
 */

 import { Stack, Container } from "react-bootstrap";

 function About() {
   return (
 
       <Container>
         <div className="p-3 my-4 mx-4 bg-light border rounded">
             <Stack gap={2}>
                 <div>
                    <h1>About</h1>
                    <h4>General Overview</h4>
                    <p>Boilerplate is a web application created for CS 40700 at Purdue University.
                        Boilerplate aims to help foster a more complete dining experience around campus
                        by making more information readily available. The application also includes features
                        for those wanting to include this more detailed picture of nutrition into a trackable
                        meal plan.
                    </p>
                 </div>
                 <hr></hr>
                 <div>
                    <h3>API</h3>
                    <p>The boilerplate API makes it easy to get Purdue Dining information from an official
                        source as a developer. Although this information is being accessed via a publicly available
                        website, the API handles the data scraping and information scrubbing, letting the developer
                        focus on the task at hand.
                    </p>
                 </div>
                 <hr></hr>
                 <div>
                     <h3>Meet the Team</h3>
                     <div>
                        <p>Geon An - Pickle1235</p>
                        <p>Colin Cross - crosstco</p>
                        <p>Gaurav Manglani - gauravmanglani</p>
                        <p>Arjan Mobin - arjanmobin</p>
                        <p>Dawson Smith - DawsonSmith</p>
                        <p>Ashton Statz - agstatz</p>
                     </div>
                 </div>
                 
             </Stack>
         </div>
     </Container>
   );
 }
 
 export default About;