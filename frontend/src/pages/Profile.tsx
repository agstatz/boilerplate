/**
 *  Profile.tsx
 *  The profile page of a given user
 * 
 * @author Ashton Statz
 */

 import { ButtonGroup, Row, Card, Col, Button} from "react-bootstrap";

 function Profile(props : any) {
   return (
            <Row>
                <Col sm={4}>
                    <Card className="my-3" bg="light">
                        <img height="200px" src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"></img>
                        <Card.Body>
                        <div>
                            <h3><strong>
                                {props.username ? props.username : "username"}
                            </strong></h3>
                            <Button href="/" className="btn-sm" variant="outline-primary">Edit Account</Button>
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
                <Col sm={8}>
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
                                Here are some recommendations based on your feedback:
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>

   );
 }
 
 export default Profile;