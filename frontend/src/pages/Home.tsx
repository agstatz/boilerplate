/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 *
 * @author Ashton Statz
 */

import background_image from "../assets/header_image.jpg";
import { Stack, Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <img src={background_image} width="100%"></img>
      <Container style={{ paddingBottom: "4vh" }}>
        <div className="p-3 my-4 mx-4 bg-light border rounded">
          <Stack gap={2}>
            <h1>
              <strong>Welcome to Boilerplate</strong>
            </h1>
            <div>
              Boilerplate is a better way to dine on campus. Using real-time
              data, craft your own experience using our variety of meal planning
              tools and suggestions. Offering meal scheduling, meal
              recommendations, campus maps, live commenting, and the ability to
              view popular items among friends, Boilerplate is an essential tool
              for maximizing the eating experience at your university. Coming to
              a college near you!
            </div>
          </Stack>
        </div>
        <div className="p-3 my-4 mx-4 bg-light border rounded">
          <Stack gap={2}>
            <h1>
              <strong>Our Inspiration</strong>
            </h1>
            <i>Boilermakers dedicated to great food</i>
            <p>
              Purdue University is widely known as the cradle of astronauts, but
              it has also been dubbed the cradle of great university dining
              options. Despite the great food and options, as students we found
              that great leaps have to be taken to take full advantage of what
              Purdue has to offer. As a result, we created Boilerplate, a web
              application that augments the on-campus dining experience in a
              multitude of ways.
            </p>
            <p>
              Boilerplate contains many features that have the primary goal of
              making it easier to eat on campus. There exists information on
              food currently being served at dining halls, past food
              information, and the ability to create and customize food
              schedules/plans. There is a custom recommendation engine that
              takes your preferences into account and suggests foods.
            </p>
          </Stack>
        </div>
      </Container>
    </>
  );
}

export default Home;
