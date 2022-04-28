/**
 *  Popular.tsx
 *  The popular page, which allows users to
 *  view popular food items
 *
 * @author Ashton Statz
 */

import { Stack, Container, Row, Col } from "react-bootstrap";
import { FoodRatingList } from "../components/";
import { MealPlanList } from "../components/MealPlans/";

function Popular() {
  return (
    <Container style={{ paddingTop: "12vh", paddingBottom: "15vh" }}>
        <Row>
            <Col md={7}>
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Stack gap={2}>
                    <h1><strong>Popular - Food</strong></h1>
                    <FoodRatingList />
                    </Stack>
                </div>
            </Col>
            <Col md={5}>
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Stack gap={2}>
                        <h1><strong>Popular - Dining Locations</strong></h1>
                        <div>
                            Among the many dining options at Purdue, there are few that separate themselves from
                            the pack. Yet, some still do, and those are forever hailed as important forums for
                            student interaction and communion. Below are just a few of the administrator-selected
                            most popular dining courts among attendees.
                        </div>
                        <Container className="px-3">
                            <li>Wiley Dining Court</li>
                            <li>Ford Dining Court</li>
                            <li>McCutcheon Dining Court</li>
                        </Container>
                        <div>Further, here are a list of the most popular dining locations that are not considered
                            dining courts:
                        </div>
                        <Container className="px-3">
                            <li>Starbucks</li>
                            <li>Ford On-The-Go</li>
                            <li>Chick-Fil-A</li>
                            <li>Qdoba</li>
                            <li>One-Bowl</li>
                            <li>PMU Dining Courts</li>
                        </Container>
                    </Stack>
                </div>
            </Col>
        </Row>
      <div className="p-3 my-4 mx-4 bg-light border rounded">
        <Stack gap={2}>
            <h1><strong>Popular - Meal Plans</strong></h1>
            <MealPlanList defaultSorted={"likes"} filterValue="private" />
        </Stack>
      </div>
    </Container>
  );
}

export default Popular;
