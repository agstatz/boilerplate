/**
 *  Footer.tsx
 *  The footer for the application
 */

 import { Container, Stack, Button, Col, Row} from "react-bootstrap";

 function Footer() {
   return (
       <Container fluid className="p-5 fixed-bottom bg-light border justify-content-center">
            <Stack>
                <Row>
                    <Col className="p-1" xs={6} md={3}>
                        <Stack>
                            <h3 className="fw-bold">Boilerplate</h3>
                            <div>Boilerplate is an application intended to augment the dining experience at Purdue University</div>
                        </Stack>
                    </Col>
                    <Col className="p-1" xs={6} md={3}>
                        <Stack>
                            <h4 className="fw-bold">Links</h4>
                            <div>link1</div>
                            <div>link2</div>
                            <div>link3</div>
                        </Stack>
                    </Col>
                    <Col className="p-1" xs={6} md={3} > 
                        <Stack>
                            <h4 className="fw-bold">Get Started</h4>
                            <Button className="mx-2 btn btn-primary btn-sm">Register/Sign in</Button>
                        </Stack>
                    </Col>
                    <Col className="p-1" xs={6} md={3}>
                        <Stack>
                            <h4 className="fw-bold">More Info</h4>
                            <div><i className="bi bi-info-circle-fill"></i> About</div>
                            <div><i className="bi bi-github"></i> Github</div>
                            <div><i className="bi bi-search"></i> Purdue Dining</div>
                        </Stack>
                    </Col>
                </Row>
                <hr />
                <div className="fs-6">Copyright Boilerplate © 2022. All rights reserved</div>
            </Stack>
       </Container>
   );
 }
 
 export default Footer;