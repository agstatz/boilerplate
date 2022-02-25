/**
 * RecommendedDiningCourtList.tsx
 * 
 * @author Gaurav Manglani
 */

 import { Stack, Container } from "react-bootstrap";
 
import { useState, useEffect } from "react";
import DiningCourtCard from "./DiningCourtCard";

 function RecommendedDiningCourtList(props : any) {

    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:5000/recommendations/location").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

   return (
       <div>
            <Container>
                <Stack gap={2}>
                    <DiningCourtCard name={"Wiley"} topFoodItems={["Pasta", "Salad", "Cookies"]}/>
                    <DiningCourtCard name={"Hillenbrand"} topFoodItems={["Wings", "Pancakes", "Yogurt Bowl"]}/>
                    <DiningCourtCard name={"Earhart"} topFoodItems={["Chicken Stir Fry", "Pizza", "Salad"]}/>
                </Stack>
            </Container>
        </div>
   );
 }

 export default RecommendedDiningCourtList;