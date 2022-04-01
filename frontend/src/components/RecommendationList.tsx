/**
 * RecommendedList.tsx
 *
 * @author Ashton Statz
 */

import { Stack, Container } from "react-bootstrap";
import { RecommendedFood } from "./";
import { store } from "../store/store.js";
import { useState, useEffect } from "react";

function RecommendedList(props: any) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:3001/foods/recommendations/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <Container>
      <Stack gap={2}>
        <RecommendedFood
          title={"Chicken Stir Fry"}
          nutrition={"200g Protein"}
        />
        <RecommendedFood title={"Cheeseburger"} nutrition={"150g Protein"} />
        <RecommendedFood
          title={"Chicken Stir Fry"}
          nutrition={"200g Protein"}
        />
      </Stack>
    </Container>
  );
}

export default RecommendedList;
