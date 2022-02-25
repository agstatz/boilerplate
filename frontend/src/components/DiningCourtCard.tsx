/**
 * DiningCourtCard.tsx
 * On the profile page, users can view recommended
 * dining courts.
 * This holds the framework for an 
 * individual dining court.
 * @author Gaurav Manglani
 */

 import { Stack, Container, Modal, Button } from "react-bootstrap";
 import { useState } from "react"

 function DiningCourtCard(props : any) {
    const { name, topFoodItems } = props
    const foods = []

    for (const [index, value] of topFoodItems.entries()) {
        foods.push(<li key={index}>{value}</li>)
    }

    // Handling modal display
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   return (
       <>
            <Container>
                <div className="p-2 my-2 mx-2 bg-light border rounded" onClick={handleShow}>
                    <Stack gap={2}>
                        <h5>{name}</h5>
                        <p>Menu:<br />{foods}</p>
                    </Stack>
                </div>
            </Container>

            <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
   );
 }
 
 export default DiningCourtCard;
 