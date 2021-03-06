/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 *
 * @author Ashton Statz
 */

import background_image from "../assets/header_image.jpg";
import ford_picture from "../assets/ford_dining_hall.jpg";
import { Stack, Container } from "react-bootstrap";
import { MotD } from "../components";

function Home() {
  return (
    <>
      <img src={background_image} width="100%"></img>
      <Container style={{ paddingBottom: "4vh" }}>
        <MotD/>
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
            <Stack direction="horizontal" gap={2} >
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
                    <p>
                    The Boilerplate team hopes you gain as much as you wish from our application.
                    Since our founding in 2022, we have been dedicated to providing the best
                    possible user experience, offering the best application, and allowing
                    students to utilize campus dining to its fullest.
                    </p>
                </Stack>
            <img
              className="p-2"
              src={ford_picture}
              style={{ maxWidth: "35%" }}
            ></img>
          </Stack>
        </div>
        <div className="p-3 my-4 mx-4 bg-light border rounded">
        <Stack gap={2}>
                    <h1>
                    <strong>Create a Meal Plan</strong>
                    </h1>
                    <i>Utilize Boilerplate to its fullest</i>
                    <p>
                    One of the best ways to take advantage of the information that
                    Boilerplate provides is to create a meal plan. Creating a meal plan
                    allows the user to take control of their dining experience and catalogue
                    the items that they intend to eat over the course of a week. This is
                    especially useful for trying to eat healthier or compare with friends.
                    </p>
                    <p>
                        To create a meal plan, visit the navigation bar link dropdown titled
                        Meal Plans, and select Schedule Meal Plans. Creating meal plans is a
                        feature exclusive to those with accounts, so if you haven't already,
                        sign up today to start creating meal plans.
                    </p>
                </Stack>
        </div>
      </Container>
    </>
  );
}

export default Home;