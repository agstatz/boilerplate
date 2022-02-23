/**
 * RecommendedFood.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences. This holds the framework
 * for an individual question component
 * 
 * @author Ashton Statz
 */

 import { Stack, Container } from "react-bootstrap";

 function RecommendedFood(props : any) {
   return (
        <Container>
            <div className="p-2 my-2 mx-2 bg-light border rounded">
                <Stack gap={2}>
                    <h5>{props.title}</h5>
                    <p>Nutrition Facts:<br />{props.nutrition}</p>
                </Stack>
            </div>
        </Container>
   );
 }
 
 export default RecommendedFood;
 