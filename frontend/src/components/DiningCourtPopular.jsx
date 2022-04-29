/**
 *  DiningCourtPopular.tsx
 *  Shows popular food items
 *  and comments for a dining court
 *
 * @author Gaurav Manglani
 */

 import { Stack, Container, Row, Col } from "react-bootstrap";
 
 function DiningCourtPopular(props) {
   const { name } = props;

   return (
     <Container style={{ paddingTop: "12vh", paddingBottom: "15vh" }}>
         <Row>
             <Col md={7}>
                 <div className="p-3 my-4 mx-4 bg-light border rounded">
                     <Stack gap={2}>
                     <h2>Popular - Food</h2>
                     </Stack>
                 </div>
             </Col>
             <Col md={5}>
                 <div className="p-3 my-4 mx-4 bg-light border rounded">
                     <Stack gap={2}>
                         <h2>Popular - Comments</h2>
                     </Stack>
                 </div>
             </Col>
         </Row>
     </Container>
   );
 }
 
 export default DiningCourtPopular;
 