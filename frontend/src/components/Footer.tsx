/**
 * Footer.tsx 
 * The footer for the application
 * 
 * @author Ashton Statz
 */

 import { Container, Stack, Button, Col, Row, Form } from "react-bootstrap";

 function Footer(props: any) {

   return (
       <Container fluid className="p-5 position-absolute bg-light border justify-content-center">
            <Stack>
                <Row>
                    <Col className="p-2" xs={6} md={3}>
                        <Stack>
                            <h3 className="fw-bold mx-auto">Boilerplate</h3>
                            <div className="mx-auto">Boilerplate is an application intended to augment the dining experience at Purdue University.</div>
                        </Stack>
                    </Col>
                    <Col className="p-2 mx-auto" xs={6} md={3}>
                        <Stack>
                            <h4 className="fw-bold mx-auto">Quick Links</h4>
                            <div className="mx-auto">link1</div>
                            <div className="mx-auto">link2</div>
                            <div className="mx-auto">link3</div>
                        </Stack>
                    </Col>
                    <Col className="p-2" xs={6} md={3} > 
                        <Stack>
                            <h4 className="fw-bold mx-auto">Get Started</h4>
                            <Button className="mx-auto btn btn-primary btn-sm" onClick={props.handleSignIn} >Register/Sign in</Button>
                            <br />
                            <Form.Check
                                className="mx-auto"
                                type="switch"
                                label="Dark Mode"
                                checked={props.theme}
                                onChange={props.toggleDark}
                            >
                            </Form.Check>
                        </Stack>
                    </Col>
                    <Col className="p-2" xs={6} md={3}>
                        <Stack>
                            <h4 className="fw-bold mx-auto">More Info</h4>
                            <div className="mx-auto"><a href="/about"><i className="bi bi-info-circle-fill"></i> About</a></div>
                            <div className="mx-auto"><a href="https://github.com/agstatz/boilerplate/"><i className="bi bi-github"></i> Github</a></div>
                            <div className="mx-auto"><a href="https://dining.purdue.edu/"><i className="bi bi-search"></i> Purdue Dining</a></div>
                        </Stack>
                    </Col>
                </Row>
                <hr />
                <div className="fs-6">Copyright Boilerplate © 2022. All rights reserved.</div>
            </Stack>
       </Container>
   );
 }
 
 export default Footer;