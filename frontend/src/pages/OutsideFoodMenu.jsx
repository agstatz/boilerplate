/**
 * EditLocation.jsx
 *
 * This form component handles editing dining locations.
 *
 * @author Dawson Smith
 */

import React from "react";
import axios from "axios";
import { Stack, Button, Container, Form, Modal, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import UnauthorizedAccess from "../components/UnauthorizedAccess";
 
// redux imports
import { store } from "../store/store.js";
 
const url = "http://localhost:3001/";
 
class OutsideFoodMenu extends React.Component {
    constructor(props) {
        super();
    
        this.state = {
            loading: true,
            username: props.location.pathname.substring(
                props.location.pathname.lastIndexOf("/") + 1
            ),
            activeUsername: store.getState().app.username,
            showModal: false,
            message: "",
            retdata: "",
            retempty: true,
            name: "",
            servingSize: "",
            calories: 0,
            totalFat: 0,
            saturatedFat: 0,
            cholesterol: 0,
            sodium: 0,
            totalCarbohydrate: 0,
            sugar: 0,
            addedSugar: 0,
            dietaryFiber: 0,
            protein: 0,
            calcium: 0,
            iron: 0,
            html: []
     };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
 
    componentDidMount() {
        this.callAPI();
    }
 
    async callAPI() {
        if (this.state.username !== this.state.activeUsername) {
            window.location.replace("/outside-food-menu/" + this.state.activeUsername);
            return;
        }
        this.setState({ loading: true });
        let response;
        try {
            response = await axios.get(url.concat("api/foods/outsidesource/").concat(this.state.username), { username: this.state.username});
        } catch (error) {
            console.log(error.response.data.msg);
        } finally {
            if ((response.data).length >= 1) {
                this.setState({
                    retempty: false
                });
            }
            // TODO loop through responses put in temp as html
            for (var i = 0; i < (response.data).length; i++) {
                var temp = response.data[i].name;
                if(temp.length > 24) {
                    temp = temp.substring(0,23) + "...";
                }
                this.state.html.push(<Container className="d-flex justify-content-center bg-light border rounded"><Row>
                                        <Col><p style={{ maxWidth: '180px', minWidth: '180px' }}>{temp}</p></Col>
                                        <Col><p style={{ maxWidth: '80px', minWidth: '80px' }}>{response.data[i].calories} Calories</p></Col>
                                        <Col><p style={{ maxWidth: '80px', minWidth: '80px' }}>{response.data[i].totalCarbohydrate}g Carbs</p></Col>
                                        <Col><p style={{ maxWidth: '80px', minWidth: '80px' }}>{response.data[i].totalFat}g Fat</p></Col>
                                        <Col><p style={{ maxWidth: '80px', minWidth: '80px' }}>{response.data[i].protein}g Protein</p></Col>
                                        <Col><p style={{ maxWidth: '80px', minWidth: '80px' }}>{response.data[i].sugar}g Sugar</p></Col>
                                        <Col><Button onClick={this.handleSubmitDelete} id={response.data[i].name} variant="secondary">Delete food</Button></Col>
                                        </Row></Container>);
                this.state.html.push();
            }
            this.forceUpdate();
        }
    }
 
   handleChange = (event) => {
     event.preventDefault();
     let target = event.target;
     let value = target.type === "checkbox" ? target.checked : target.value;
     let name = target.id;
     this.setState({
       [name]: value,
     });
   };
 
   handleCheck = (event) => {
     this.setState({
       hidden: event.target.checked,
     });
   };
 
   handleClose = (event) => {
     this.setState({
       showModal: false,
     });
   };
 
   handleOpen = (event) => {
     this.setState({
       showModal: true,
     });
   };
 
    handleSubmitDelete = (event) => {
        const deleteInfo = {
            username: this.state.username,
            name: event.target.id
        }
        axios.delete("http://localhost:3001/api/foods/outsidesource/", { data: deleteInfo })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.response.data.msg);
                this.setState({ message: err.response.data.msg });
            });
    };
 
   // handles submitting the form
    handleSubmit = (event) => {
        // prevent page from reloading
        event.preventDefault();
        this.setState({ message: "" });
        const foodInfo = {
            headers: {
                "Content-Type": "application/json",
            },
            username: this.state.username,
            name: this.state.name,
            servingSize: this.state.servingSize,
            calories: this.state.calories,
            totalFat: this.state.totalFat,
            saturatedFat: this.state.saturatedFat,
            cholesterol: this.state.cholesterol,
            sodium: this.state.sodium,
            totalCarbohydrate: this.state.totalCarbohydrate,
            sugar: this.state.sugar,
            addedSugar: this.state.addedSugar,
            dietaryFiber: this.state.dietaryFiber,
            protein: this.state.protein,
            calcium: this.state.calcium,
            iron: this.state.iron,
        };
        this.setState({ message: "" });
        var noErr = true;
        if (noErr && !/^([a-zA-Z0-9 \-]{3,})$/.test(this.state.name)) {
            this.setState({ message: "Name must be 3 characters long and user only valid characters" });
            noErr = false;
        }
        if (noErr && !/^([a-zA-Z0-9 \-]{1,})$/.test(this.state.servingSize)) {
            this.setState({ message: "Serving size must be 3 characters long and user only valid characters" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.calories)) {
            this.setState({ message: "Calories must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.totalFat)) {
            this.setState({ message: "Total fat must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.saturatedFat)) {
            this.setState({ message: "Saturated fat must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.cholesterol)) {
            this.setState({ message: "Cholesterol must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.sodium)) {
            this.setState({ message: "Sodium must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.totalCarbohydrate)) {
            this.setState({ message: "Total carbohydrates must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.sugar)) {
            this.setState({ message: "Sugar must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.addedSugar)) {
            this.setState({ message: "Added sugar must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.dietaryFiber)) {
            this.setState({ message: "Dietary fiber must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.protein)) {
            this.setState({ message: "Protein must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.calcium)) {
            this.setState({ message: "Calcium must be a positive number or zero" });
            noErr = false;
        }
        if (noErr && !/^([0-9]{1,})$/.test(this.state.iron)) {
            this.setState({ message: "Iron must be a positive number or zero" });
            noErr = false;
        }
        if (noErr) {
            axios.post("http://localhost:3001/api/foods/outsidesource", { data: foodInfo })
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.response.data.msg);
                    this.setState({ message: err.response.data.msg });
                });
        }
    };
 
    render() {
        var modalform = <Modal show={this.state.showModal} onHide={this.handleClose} animation={false} >
                            <Modal.Header closeButton>
                                <Modal.Title>Add food</Modal.Title>
                            </Modal.Header>
                            <Form className="mx-1 justify-content-center" onSubmit={this.handleSubmit} align="center" >
                                <Container className=" mt-4 mb-4  justify-content-center">
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="name" >
                                    <Form.Label>Food Name</Form.Label>
                                    <Form.Control type="name" value={this.state.name} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="servingSize" >
                                    <Form.Label>Serving Size</Form.Label>
                                    <Form.Control type="servingSize" value={this.state.servingSize} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="calories" >
                                    <Form.Label>Calories</Form.Label>
                                    <Form.Control type="calories" value={this.state.calories} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="totalFat" >
                                    <Form.Label>Total Fat (g)</Form.Label>
                                    <Form.Control type="totalFat" value={this.state.totalFat} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="saturatedFat" >
                                    <Form.Label>Saturated Fat (g)</Form.Label>
                                    <Form.Control type="saturatedFat" value={this.state.saturatedFat} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="cholesterol" >
                                    <Form.Label>Cholesterol (mg)</Form.Label>
                                    <Form.Control type="cholesterol" value={this.state.cholesterol} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="sodium" >
                                    <Form.Label>Sodium (mg)</Form.Label>
                                    <Form.Control type="sodium" value={this.state.sodium} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="totalCarbohydrate" >
                                    <Form.Label>Total Carbohydrate (g)</Form.Label>
                                    <Form.Control type="totalCarbohydrate" value={this.state.totalCarbohydrate} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="sugar" >
                                    <Form.Label>Sugar (g)</Form.Label>
                                    <Form.Control type="sugar" value={this.state.sugar} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="addedSugar" >
                                    <Form.Label>Added Sugar (g)</Form.Label>
                                    <Form.Control type="addedSugar" value={this.state.addedSugar} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="dietaryFiber" >
                                    <Form.Label>Dietary Fiber (g)</Form.Label>
                                    <Form.Control type="dietaryFiber" value={this.state.dietaryFiber} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="protein" >
                                    <Form.Label>Protein (g)</Form.Label>
                                    <Form.Control type="protein" value={this.state.protein} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="calcium" >
                                    <Form.Label>Calcium (mg)</Form.Label>
                                    <Form.Control type="calcium" value={this.state.calcium} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="iron" >
                                    <Form.Label>Iron (mg)</Form.Label>
                                    <Form.Control type="iron" value={this.state.iron} onChange={this.handleChange} />
                                </Form.Group>
                                <p>{this.state.message}</p>
                                </Container>
                            </Form>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.handleSubmit}>
                                    Add food
                                </Button>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>;

        if (this.state.retempty) {
            return (
                <Container className="d-flex justify-content-center" style={{ paddingTop: "10vh", paddingBottom: "2vh",
                        paddingLeft: "30vh", paddingRight: "30vh", marginBottom: "30vh"}}>
                    <div className="p-5 my-4 mx-3 justify-content-center bg-light border rounded">
                        <Stack>
                        <div>
                            <h3>Your foods</h3>
                            <p>
                                It appears that you have no foods! You can use the button below to add a 
                                food for access in your food logs. Your food information will stay here for
                                future use (as long as you don't delete it).
                            </p>
                        </div>
                        </Stack>
                        <Stack spacing={4}>
                            <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleOpen} type="delete" >
                            Add food
                            </Button>
                        </Stack>
                        {modalform}
                    </div>
                </Container>
            );
        }
        let i = 0;
        const listItems = this.state.html.map((d) => (
            <d.type
                key={"list" + i++}
                src={d.props.src}
                alt={d.props.name}
                to={d.props.to}
                id={d.key}
                style={d.props.style}
                color={d.props.color}
                height={d.props.height}
                width={d.props.height}
                type={d.props.type}
                name={d.props.name}
                value={d.props.value}
                checked={d.props.checked}
                onChange={d.props.onChange}
                class={d.props.class}
                className={d.props.className}
                defaultChecked={d.props.defaultChecked}
            >
                {d.props.children}
            </d.type>
        ));
        if (this.state.username === this.state.activeUsername) {
            return (
                <Container className="d-flex justify-content-center" style={{ paddingTop: "10vh", paddingBottom: "2vh", paddingLeft: "55vh", paddingRight: "55vh"}}>
                    <div className="p-5 my-4 mx-3 d-flex justify-content-center bg-light border rounded" style={{ maxWidth: '950px', minWidth: '950px' }}>
                        <Stack>
                            <Container className="mb-2 d-flex justify-content-center">
                                <h3>Your Foods</h3>
                            </Container>
                            {listItems}
                            <Stack spacing={4}>
                                <Button className="mb-2 mt-3 btn btn-primary btn-sm" onClick={this.handleOpen} type="delete" >
                                    Add food
                                </Button>
                            </Stack>
                            {modalform}
                        </Stack>
                    </div>
                </Container>
            );
        } else {
            return <UnauthorizedAccess />;
        }
    }
 }
 
 export default OutsideFoodMenu;
 