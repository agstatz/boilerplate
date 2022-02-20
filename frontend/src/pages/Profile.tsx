/**
 *  Profile.tsx
 *  The profile page of a given user
 * 
 * @author Ashton Statz
 */

 import { Row, Card, Col, Button} from "react-bootstrap";
 import { RecommendedFood } from "../components";

 function Profile(props : any) {
   return (
            <Row>
                <Col xs={6} sm={5} md={4} lg={3} xl={2}>
                    <Card className="my-3" bg="light">
                        <img height="200px" src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"></img>
                        <Card.Body>
                        <div>
                            <h3><strong>
                                {props.match.params.id ? props.match.params.id : "username"}
                            </strong></h3>
                            <Button href={"/edit/" + (props.username ? props.username : "a")} className="btn-sm" variant="outline-primary">Edit Account</Button>
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
                <Col xs={6} sm={7} md={8} lg={9} xl={10}>
                    <Card className="my-3" bg="light" >
                        <Card.Body>
                            <Card.Text>
                                ADD THE FOLLOWING TABS TO THIS PAGE:<br />
                                Recommended, Meal History, Meal Plans/Schedule, Dietary Info
                            </Card.Text>

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
                            <RecommendedFood title={"Chicken Stir Fry"} nutrition={"200g Protein"}/>
                            <RecommendedFood title={"Cheeseburger"} nutrition={"150g Protein"}/>
                            <RecommendedFood title={"Chicken Stir Fry"} nutrition={"200g Protein"}/>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>

   );
 }
 
 export default Profile;