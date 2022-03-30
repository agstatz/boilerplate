import { Container, Stack, Button, Col, Row, Form } from "react-bootstrap";

import { store } from '../store/store'

function GuestUserRedirect() {

    return (
        <Container className="d-flex justify-content-center" style={{ paddingTop: '10vh', paddingBottom: '2vh', paddingLeft: '55vh', paddingRight: '55vh'}} >
            <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
                <Stack>
                    <div>
                        <h3>Sorry!</h3>
                        <p>This site function or page is not accessible to guest users. To continue please create an account.</p>
                        <a href="/register">Create an account here!</a>
                        <a href="/login">... or login here!</a>
                    </div>
                </Stack>
            </div>
        </ Container>
    );
}

export default GuestUserRedirect;