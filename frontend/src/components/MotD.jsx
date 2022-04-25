import { Container, Stack, Button, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from "axios";
 
function MotD(props: any) {
    const [messageContents, setMessageContents] = useState("");
    const [hideMessage, setHideMessage] = useState(false);
    useEffect(async () => {
        try {
            axios.get("http://localhost:3001/api/motd/main").then((res) => {
                setMessageContents(res.data.contents);
                setHideMessage(res.data.isHidden);
        });
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div hidden={hideMessage} className="p-3 my-4 mx-4 bg-light border rounded">
            <Stack gap={2}>
                <h1>
                    <strong>Message of the Day</strong>
                </h1>
                <div>
                    {messageContents}
                </div>
            </Stack>
        </div>
    );
}
 
 export default MotD;