/**
 *  DietaryInfo.jsx
 *  The dietary restriction page for the application.
 *
 * @author Arjan Mobin
 */

import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Stack,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { store } from "../store/store.js";
import GuestUserRedirect from "./GuestUserRedirect";

function DietaryInfo(props) {
  const [dietary, setDietary] = useState(0);
  const [dairy, setDairy] = useState(0);
  const [gluten, setGluten] = useState(0);
  const [nuts, setNuts] = useState(0);
  const [religious, setReligious] = useState(0);
  const [mealSwipes, setMealSwipes] = useState(0);
  const [submitted, setSubmitted] = useState({});

  function submitForm() {
    if (store.getState().app.isNotGuest !== true) {
          return;
    }
    try {
      axios
        .post("http://localhost:3001/api/editUserDietaryPreferences", {
          data: {
            dietary: dietary,
            dairy: dairy,
            gluten: gluten,
            nuts: nuts,
            religious: religious,
            mealSwipes: mealSwipes,
            username: store.getState().app.username,
          },
        })
        .then((res) => {
          console.log(res);
          setSubmitted({
            text: "Your dietary preferences have been updated!",
            color: "text-success",
          });
        })
        .catch((err) => {
          console.error(err);
          setSubmitted({
            text: "En error occured, please try again.",
            color: "text-danger",
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(async () => {
    if (store.getState().app.isNotGuest !== true) {
        return;
    }
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/users/dietary/" +
          store.getState().app.username
      );
      console.log(response);
      const restriction_tags = [];
      for (const restriction of response.restrictions) {
        restriction_tags.push(restriction.name);
      }

      if (restriction_tags.includes("vegetarian")) {
        setDietary(1);
      }

      if (restriction_tags.includes("vegan")) {
        setDietary(2);
      }

      if (restriction_tags.includes("pescatarian")) {
        setDietary(3);
      }

      if (restriction_tags.includes("dairy")) {
        setDairy(1);
      }

      if (restriction_tags.includes("gluten")) {
        setGluten(1);
      }

      if (restriction_tags.includes("nuts")) {
        setNuts(1);
      }

      if (restriction_tags.includes("halal")) {
        setReligious(1);
      }

      if (restriction_tags.includes("kosher")) {
        setReligious(2);
      }

      setMealSwipes(response.mealSwipes);
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (store.getState().app.isNotGuest !== true) {
      return <GuestUserRedirect />;
  }

  return (
    <Container>
      <div className="p-3 my-1 mx-4">
        <h1>
          <strong>Dietary Info</strong>
        </h1>
        <br />
        <div>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={6}>
                <h3>Restrictions:</h3>
              </Form.Label>
            </Form.Group>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              <Stack gap={2}>
                <h4>Dietary</h4>
              </Stack>
              <Stack className="p-1 d-flex justify-content-center">
                <Form.Check
                  type="radio"
                  label="Vegetarian"
                  name="veg_status"
                  checked={dietary == 1}
                  onChange={() => setDietary(1)}
                />
                <Form.Check
                  type="radio"
                  label="Vegan"
                  name="veg_status"
                  checked={dietary == 2}
                  onChange={() => setDietary(2)}
                />
                <Form.Check
                  type="radio"
                  label="Pescatarian"
                  name="veg_status"
                  checked={dietary == 3}
                  onChange={() => setDietary(3)}
                />
                <Form.Check
                  type="radio"
                  label="None of these apply"
                  name="veg_status"
                  checked={dietary == 0}
                  onChange={() => setDietary(0)}
                />
              </Stack>
            </div>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              <Stack gap={2}>
                <h4>Dairy Allergy</h4>
              </Stack>
              <Stack className="p-1 d-flex justify-content-center">
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="dairy_allergy"
                  checked={dairy == 1}
                  onChange={() => setDairy(1)}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="dairy_allergy"
                  checked={dairy == 0}
                  onChange={() => setDairy(0)}
                />
              </Stack>
            </div>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              <Stack gap={2}>
                <h4>Gluten Allergy</h4>
              </Stack>
              <Stack className="p-1 d-flex justify-content-center">
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="gluten_allergy"
                  checked={gluten == 1}
                  onChange={() => setGluten(1)}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="gluten_allergy"
                  checked={gluten == 0}
                  onChange={() => setGluten(0)}
                />
              </Stack>
            </div>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              <Stack gap={2}>
                <h4>Nut Allergy</h4>
              </Stack>
              <Stack className="p-1 d-flex justify-content-center">
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="nut_allergy"
                  checked={nuts == 1}
                  onChange={() => setNuts(1)}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="nut_allergy"
                  checked={nuts == 0}
                  onChange={() => setNuts(0)}
                />
              </Stack>
            </div>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              <Stack gap={2}>
                <h4>Religious Restrictions</h4>
                <Stack className="p-1 d-flex justify-content-center">
                  <Form.Check
                    type="radio"
                    label="Halal"
                    name="law_status"
                    checked={religious == 1}
                    onChange={() => setReligious(1)}
                  />
                  <Form.Check
                    type="radio"
                    label="Kosher"
                    name="law_status"
                    checked={religious == 2}
                    onChange={() => setReligious(2)}
                  />
                  <Form.Check
                    type="radio"
                    label="None"
                    name="law_status"
                    checked={religious == 0}
                    onChange={() => setReligious(0)}
                  />
                </Stack>
                <br />
              </Stack>
            </div>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={6}>
                <h3>Meal Plan Info:</h3>
              </Form.Label>
            </Form.Group>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              <Stack gap={2}>
                <h4>Meal Swipes</h4>
                <p>How many meal swipes do you have available per week?</p>
                <Container className="p-1 d-flex justify-content-center">
                  <RangeSlider
                    value={mealSwipes}
                    onChange={(changeEvent) =>
                      setMealSwipes(parseInt(changeEvent.target.value))
                    }
                    min={0}
                    max={30}
                  />
                </Container>
                <br />
              </Stack>
            </div>
            {}
            <p className="d-flex justify-content-center ">
              <p className={submitted.color}>{submitted.text}</p>
            </p>

            <Container className="d-flex justify-content-center">
              <Button className="mx-2" onClick={submitForm}>
                Submit Preferences <i className="bi bi-chevron-right"></i>
              </Button>
            </Container>
          </Form>
        </div>
        <Row>
          <Col md={10} sm={9} xs={8}></Col>
          <Col md={2} sm={3} xs={4}></Col>
        </Row>
      </div>
    </Container>
  );
}

export default DietaryInfo;
