/**
 * FoodCard.tsx
 * 
 * @author Ashton Statz
 */

 import { Stack, Container } from "react-bootstrap";

 function FoodCard(props : any) {
   return (
        <Container>
            <div className="p-2 my-2 mx-2 bg-light border rounded">
                <Stack gap={2}>
                    <h5>{props.title}</h5>
                    <p>{props.nutrition}</p>
                </Stack>
            </div>
        </Container>
   );
 }

 export default FoodCard;