import React from "react";
import {Link, Redirect} from "react-router-dom";
import { Grid } from '@mui/material';
import queryString from "query-string";
import { store } from "../store/store.js";
import { Stack, Container, Placeholder, Button, Modal, Form } from "react-bootstrap";
import { StarRating } from "../components/";
import UserTags from "../components/UserTags"

const url = 'http://localhost:3001/'

var ress;
const axios = require('axios')



export default class Food extends React.Component {
    constructor() {
        super();
        this.state = {
            res: "",
            loading: true,
            html: [],
            adminhtml: [],
            loggedInhtml: [],
            data: [],
            isNotGuest: store.getState().app.isNotGuest,
            username: store.getState().app.username,
            showModal: false,
            newTagName: "",
            rating: 0
        };
        this.getRatingFromAPI = this.getRatingFromAPI.bind(this);
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
    }

    async getRatingFromAPI() {
        const userdata = {
            ownerName: 'broski',
            foodName: 'food',
            rating: 2
        }
        
        axios
            .post('http://localhost:3001/api/editFoodRating', { data: userdata })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.callAPI();
        this.getRatingFromAPI();
    }

    async callAPI() {
        this.state.loading = true;
        let loggedIn = true;
        let admin = true;

        try {
            var response = await axios.get(url + `food?name=` + this.state.queries.name);
        } catch (error) {
            console.log("error")
        } finally {
            //console.log(response)
            if (response.data[0] == null) {
                this.state.html.push(<a>This food ({this.state.queries.name}) does not exist.</a>)
                //console.log("NA")
            } else {
                if (admin) {
                    this.state.adminhtml.push(
                        <Link to={"edit_food?name=" + this.state.queries.name}>
                            <Button type="button">
                                Edit Food
                            </Button>
                        </Link>)
                }
                this.setState({data: response.data[0]})
                //console.log(this.state.data)
                this.state.html.push(<h1>{this.state.data.name}</h1>)
                this.state.html.push(<h3><br></br>Nutrition Facts</h3>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<h5>Serving size: {this.state.data.servingSize}</h5>)
                this.state.html.push(<hr className="class-1"></hr>)
                this.state.html.push(<h5>Amount per serving<br></br></h5>)
                this.state.html.push(<h3>Calories: {this.state.data.calories}<br></br></h3>)
                this.state.html.push(<hr className="class-2"></hr>)
                this.state.html.push(<a><strong>Total Fat:</strong> {this.state.data.totalFat}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>&emsp;&emsp;Saturated Fat: {this.state.data.saturatedFat}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a><strong>Cholesterol:</strong> {this.state.data.cholesterol}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a><strong>Sodium:</strong> {this.state.data.sodium}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a><strong>Total Carbohydrate:</strong> {this.state.data.totalCarbohydrate}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>&emsp;&emsp;Dietary Fiber: {this.state.data.dietaryFiber}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>&emsp;&emsp;Sugar: {this.state.data.sugar}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>&emsp;&emsp;&emsp;&emsp;Added Sugar: {this.state.data.addedSugar}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a><strong>Protein:</strong> {this.state.data.protein}<br></br></a>)
                this.state.html.push(<hr className="class-1"></hr>)
                this.state.html.push(<a>Calcium: {this.state.data.calcium}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Iron: {this.state.data.iron}<br></br></a>)
                this.state.html.push(<hr className="class-2"></hr>)
                this.state.html.push(<a>Tags: {this.state.data.tags}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Diets: {this.state.data.diet}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Groups: {this.state.data.group}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Cuisine: {this.state.data.cuisine}<br></br></a>)
                this.state.html.push(<hr className="class-2"></hr>)
                this.state.html.push(<a>Ingredients: {this.state.data.ingredients}</a>)
            }



            this.state.loading = false;
            this.forceUpdate();
        }
    }

    handleClose = (event) => {
        this.setState({
            showModal: false
        });
    }

    handleOpen = (event) => {
        this.setState({
            showModal: true
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.id;
        this.setState({
            [name]: value
        });
    }

    handleSubmitTag = (event) => {
        event.preventDefault();
        var noErr = true
        if (noErr && !/^([a-zA-Z \-]{3,})$/.test(this.state.newTagName)) {
            this.setState({ message: "Must be 3 characters long only letters" })
            noErr = false
        }
        if (noErr && !/^([A-Z]{1,1}[a-z \-]{2,})$/.test(this.state.newTagName)) {
            this.setState({ message: "Must start with a capital letter and have no other capital letters" })
            noErr = false
        }
        const reqInfo = {
            headers: {
                'Content-Type': 'application/json'
            },
            username: this.state.username,
            foodName: this.state.queries.name,
            foodTagName: this.state.newTagName
        }
        if (noErr) {
            axios
                .post('http://localhost:3001/api/addUserTag', { data: reqInfo })
            this.state.showModal = false;
            window.location.reload();
        }
    }

    render() {
        if (this.state.queries.name == null) {
            return (
                <Redirect to="/Foods" push />
            )
        }
        if (this.state.loading) {
            return (
                <div className="App">
                    <header className="App-header">
                    </header>
                </div>
            )
        }
        let i = 0;
        const listItems = this.state.html.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                className={d.props.class}
            >{d.props.children}</d.type>);
        const adminItems = this.state.adminhtml.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                className={d.props.class}
            >{d.props.children}</d.type>);
        const loggedInItems = this.state.loggedInhtml.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                className={d.props.class}
            >{d.props.children}</d.type>);



        return (
            <div className="App">
                <Container style={{ paddingTop: '10vh', paddingBottom: '10vh'}}>
                    <div >
                        <Container style={{ paddingLeft: '2vh', paddingRight: '115vh'}}>
                            <Stack>
                                {adminItems}
                            </Stack>
                        </Container>
                        <div className="p-3 my-4 mx-4 bg-light border rounded w-100">
                            <UserTags />
                            {loggedInItems}
                        </div>
                        <Container style={{ paddingLeft: '2vh', paddingRight: '115vh'}}>
                            <Stack>
                                <Button className="mb-2 mt-3 btn btn-secondary btn-sm" hidden={this.state.isNotGuest !== true} onClick={this.handleOpen}>Add food tag</Button>
                            </Stack>
                        </Container>
                    </div>
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        {listItems}
                    </div>
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <h3>Give {this.state.data.name} a rating!</h3>
                        <StarRating inputRating={this.state.rating}/>
                    </div>
                </Container>
                <Form onSubmit={this.handleSubmitTag}>
                    <Modal show={this.state.showModal} onHide={this.handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add user tag</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Add a user tag to {this.state.queries.name}?\n Proper format includes only lowercase
                                    letters, spaces, and hyphens, except for the first character. The first character MUST be capital.
                            <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='newTagName'>
                                <Form.Label>New Tag Name</Form.Label>
                                <Form.Control type="newTagName" value={this.state.newTagName} onChange={this.handleChange} />
                            </Form.Group>
                            {this.state.message}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleSubmitTag}>Add tag</Button>
                            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </div>
        );
    }
}