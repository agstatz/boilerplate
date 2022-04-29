/**
 * RecommendedFood.tsx
 * Recommended foods
 *
 * @author Ashton Statz
 */

import { Stack, Container } from "react-bootstrap";

function RecommendedFood(props: any) {
  return (
    <Container>
      <div className="">
        <Stack gap={2}>
          <h5>{props.title}</h5>
          <p>
            Nutrition Facts:
            <br />
            {props.nutrition}
          </p>
        </Stack>
      </div>
    </Container>
  );
}

export default RecommendedFood;
