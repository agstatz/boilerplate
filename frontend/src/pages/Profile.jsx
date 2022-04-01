/**
 *  Profile.jsx
 *  The profile page of a given user
 *
 * @author Ashton Statz, Gaurav Manglani
 */

import axios from "axios";
import {
  Row,
  Card,
  Col,
  Button,
  Stack,
  Container,
  Placeholder,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap-tabs";
import {
  RecommendedFood,
  MealPlanList,
  RecommendedDiningCourtList,
  DietaryInfo
} from "../components";


import { PageNotFound } from "./";

import { store, ClearForm, UpdateForm } from "../store/store";

import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
function Profile(props) {
  const history = useHistory();

  const { id } = useParams();
  const username = store.getState().app.username;
  const mealSwipes = store.getState().app.mealSwipes;
  const [foods, setFoods] = useState([{}]);

  const handleLogout = () => {
    try {
      store.dispatch(ClearForm()).then((res) => {
          window.location.replace("/");
        })
        .catch((err) => {
          window.location.replace("/");
        });
    } catch (err){
      window.location.replace("/");
    }
  };

  function resetAccount() {
    confirmAlert({
      title: "Confirm to submit",
      message:
        "Are you sure to do this. This will reset all your account preferences.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios.post("http://localhost:3001/api/resetUser", {
              data: {
                username: username,
              },
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  const handleMealSwipeReset = () => {
    const userInfo = {
      username: username,
      mealSwipes: 20,
    };

    axios
      .post("http://localhost:3001/api/editUserPreferences", { data: userInfo })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    store.dispatch(UpdateForm("mealSwipes", 20));
    window.location.reload();
  };

  useEffect(async () => {
    const { data: response } = await axios.get(
      "http://localhost:3001/api/foods/recommendations"
    );
    setFoods(response);

    const getProfile = async () => {
      try {
        // TODO: get user based on username
      } catch (err) {
        return <PageNotFound />;
      }
    };
    getProfile(id);
  }, []);

  function foodItems() {
    return foods.map((food) => (
      <Container>
        <Stack gap={2}>
          <RecommendedFood title={food.name} nutrition={food.nutrition} />
          {likeDislike()}
        </Stack>
      </Container>
    ));
  }

  function likeDislike(liked) {
    const radios = [
      { name: "Like", value: "1" },
      { name: "Dislike", value: "2" },
    ];

    return (
      <>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 == 0 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={liked == radio.value}
              onChange={(e) => 1}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }

  return (
    <Container style={{ paddingTop: "12vh" }}>
      <Row>
        <Col xs={6} sm={5} md={4} lg={3} xl={3}>
          <Card
            className="my-3"
            bg="light"
            style={{ maxWidth: "200px", minWidth: "200px" }}
          >
            <img
              alt="Profile"
              height="200"
              src="https://i.stack.imgur.com/l60Hf.png"
            ></img>
            <Card.Body>
              <div>
                <h5>
                  <strong>{id ? id : "username"}</strong>
                </h5>
                {username === id ? (
                  <Stack gap="3">
                    <Button
                      href={`/edit/${id}`}
                      className="btn-sm"
                      variant="outline-primary"
                    >
                      Edit Account
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="btn-sm"
                      variant="outline-primary"
                    >
                      Sign Out
                    </Button>
                    <Button
                      onClick={resetAccount}
                      className="btn-sm"
                      variant="outline-primary"
                    >
                      Reset Account
                    </Button>
                  </Stack>
                ) : (
                  <></>
                )}
                <Row className="mt-3">
                  <Col className="text-center">
                    <strong>40</strong>
                    <p>Friends</p>
                  </Col>
                  <Col className="text-center">
                    <strong>3</strong>
                    <p>Favorites</p>
                  </Col>
                </Row>
                <Card.Text></Card.Text>
              </div>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={6} sm={7} md={8} lg={9} xl={9}>
          <Card className="my-3" bg="light">
            <Card.Body>
              <Tabs className="mx-3">
                <Tab label="My Meal Plans">
                  <MealPlanList filterValue={id} />
                </Tab>
                <Tab label="My Dietary Info">
                  <DietaryInfo />
                </Tab>
              </Tabs>
              <Tab label="Meal History">
                  <Placeholder animation="glow" size="lg">
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} />
                  </Placeholder>
                </Tab>
              <Row className="mt-3">
                <Col className="text-center">
                  <strong>{mealSwipes}</strong>
                  <p>Meal Swipes Left</p>
                </Col>
                <Col className="text-center">
                  <Button
                    onClick={handleMealSwipeReset}
                    className="btn-sm"
                    variant="outline-primary"
                  >
                    Reset Week
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card className="my-3" bg="light">
            <Card.Header className="h5">
              <strong>Favorites</strong>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Chicken Parmesan
                <br />
                Stir Fry
                <br />
                Waffle Fries
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card className="my-3" bg="light">
            <Card.Header className="h5">
              <strong>Recommended</strong>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Here are some recommendations based on your history and
                feedback:
              </Card.Text>
              <Row>
                <Col>
                  <Card.Text>Food Items:</Card.Text>
                  <Container>
                    <Stack gap={2}>{foodItems()}</Stack>
                  </Container>{" "}
                </Col>

                <Col>
                  <Card.Text>Dining Courts:</Card.Text>
                  <RecommendedDiningCourtList />
                </Col>
              </Row>
              <br />
              <Container className="d-flex justify-content-center">
                <Button
                  className="mx-2"
                  onClick={async () => {
                    fetch(`http://localhost:3001/api/foods/recommendations`)
                      .then((res) => res.json())
                      .then((data) => {
                        setFoods(data);
                      });
                  }}
                >
                  Generate Recommendations{" "}
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
