/**
 * RecommendedDiningCourts.tsx
 * On the profile page, users can view recommended
 * dining courts.
 * This holds the framework for an 
 * individual dining court.
 * 
 * @author Gaurav Manglani
 */

 import { Stack, Container } from "react-bootstrap";

 function RecommendedDiningCourts(props : any) {
    const { name, topFoodItems } = props
    const foods = []

    for (const [index, value] of topFoodItems.entries()) {
        foods.push(<p key={index}>{value}</p>)
    }

   return (
        <Container>
            <div className="p-2 my-2 mx-2 bg-light border rounded">
                <Stack gap={2}>
                    <h5>{name}</h5>
                    Top Food Items:<br />
                    <ul>{foods}</ul>
                </Stack>
            </div>
        </Container>
   );
 }
 
 export default RecommendedDiningCourts;
 