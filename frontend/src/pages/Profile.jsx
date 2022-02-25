/**
 *  Profile.jsx
 *  The profile page of a given user
 * 
 * @author Ashton Statz, Gaurav Manglani
 */

 import { Row, Card, Col, Button} from "react-bootstrap";
 import { Tabs, Tab } from "react-bootstrap-tabs";
 import { RecommendationList, MealPlanList, RecommendedDiningCourts } from "../components";
 import { PageNotFound } from "./";

 import { store } from "../store/store";

 import { useParams } from 'react-router-dom';
 import { useEffect, useState } from 'react';

 function Profile(props) {

    const [user, setUser] = useState([{}]);

    const { id } = useParams();
    const username = store.getState().app.username;

    useEffect(() => {
        const getProfile = async() => {
            try {
                // TODO: get user based on username

            } catch (err) {
                return <PageNotFound />
            }
        }
        getProfile(id);
    }, []);


    return (
            <Row>
                <Col xs={6} sm={5} md={4} lg={3} xl={3}>
                    <Card className="my-3" bg="light" style={{maxWidth: "200px", minWidth: "200px"}}>
                        <img alt="Profile" 
                             height="200"
                             src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg">
                        </img>
                        <Card.Body>
                        <div>
                            <h5><strong>
                                {id ? id : "username"}
                            </strong></h5>
                            {username === id ? <Button href={`/edit/${id}`} className="btn-sm" variant="outline-primary">Edit Account</Button> : <></>}
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
                            <Card.Text>
                                {props.bio ? props.bio : "user bio"}
                            </Card.Text>
                        </div>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={6} sm={7} md={8} lg={9} xl={9}>
                    <Card className="my-3" bg="light" >
                        <Card.Body>
                        <Tabs className="mx-3">
                            <Tab label="Meal History" >Meal History Not Loading...</Tab>
                            <Tab label="Meal Plans"><MealPlanList filterValue={id}/></Tab>
                            <Tab label="My Dietary Info">Dietary Info Not Loading...</Tab>
                        </Tabs>
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
                                Chicken Parmesan<br />
                                Stir Fry<br />
                                Waffle Fries<br />
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
                                Here are some recommendations based on your history and feedback:
                            </Card.Text>
                            <Row>
                                <Col>
                                    <Card.Text>Food Items:</Card.Text>
                                    <RecommendationList />
                                </Col>
                                <Col>
                                    <Card.Text>Dining Courts:</Card.Text>
                                    <RecommendedDiningCourts name={"Wiley"} topFoodItems={["Pasta", "Salad", "Cookies"]}/>
                                    <RecommendedDiningCourts name={"Hillenbrand"} topFoodItems={["Wings", "Pancakes", "Yogurt Bowl"]}/>
                                    <RecommendedDiningCourts name={"Earhart"} topFoodItems={["Chicken Stir Fry", "Pizza", "Salad"]}/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>

    );
 }
 
 export default Profile;