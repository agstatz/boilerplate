/**
 *  Popular.tsx
 *  The popular page, which allows users to
 *  view popular food items
 *
 * @author Ashton Statz
 */

import { Stack, Container } from "react-bootstrap";
import { FoodRatingList } from "../components/";

function Popular() {
  return (
    <Container style={{ paddingTop: "12vh", paddingBottom: "15vh" }}>
      <div className="p-3 my-4 mx-4 bg-light border rounded">
        <Stack gap={2}>
          <h1>Popular - Food</h1>
          <FoodRatingList />
        </Stack>
      </div>
      <div className="p-3 my-4 mx-4 bg-light border rounded">
        <Stack gap={2}>
          <h1>Popular - Dining Courts</h1>
          <div>Popular Dining Courts</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </Stack>
      </div>
      <div className="p-3 my-4 mx-4 bg-light border rounded">
        <Stack gap={2}>
          <h1>Popular - Meal Plans</h1>
          <div>Popular Meal Plans</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </Stack>
      </div>
    </Container>
  );
}

export default Popular;
