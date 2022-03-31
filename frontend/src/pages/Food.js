import React from "react";
import {Link, Redirect} from "react-router-dom";
import { Grid } from '@mui/material';
import queryString from "query-string";

import { Container, Placeholder, Button } from "react-bootstrap";
import { store, ClearForm, UpdateForm } from "../store/store";
const url = 'http://localhost:3001/'

const axios = require('axios')




export default class Food extends React.Component {

    constructor() {
        super();
        this.state = {
            username: store.getState().app.username,
            res: "",
            loading: true,
            html: [],
            adminhtml: [],
            loggedInhtml: [],
            data: [],
            tried: false,
        };

        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
    }

    componentDidMount() {
        this.callAPI();
    }

    async callAPI() {
        console.log(this.state.username)
        this.state.loading = true;
        let admin = true;
        try {
            var response = await axios.get(url + `food?name=` + this.state.queries.name);
        } catch (error) {
            console.log("error")
        } finally {
            if (response.data[0] == null) {
                this.state.html.push(<a>This food ({this.state.queries.name}) does not exist.</a>)
                console.log("NA")
            } else {
                if (admin) {
                    this.state.adminhtml.push(
                        <Link to={"edit_food?name=" + this.state.queries.name}>
                            <Button type="button">
                                Edit This Food
                            </Button>
                        </Link>)
                }
                this.setState({data: response.data[0]})
                if (this.state.data.dietaryTags == null || this.state.data.dietaryTags === "undefined" || this.state.data.dietaryTags === "") {
                    this.state.data.dietaryTags = [];
                }
                if (this.state.data.diets == null || this.state.data.diets === "undefined" || this.state.data.diets === "") {
                    this.state.data.diets = [];
                }
                if (this.state.data.groups == null || this.state.data.groups === "undefined" || this.state.data.groups === "") {
                    this.state.data.groups = [];
                }
                this.state.html.push(<h1>{this.state.data.name}</h1>)
                this.state.html.push(<hr></hr>)

                if (this.state.username != null || this.state.username !== "undefined" || this.state.username !== "") {
                    try {
                        var response = await axios.get(url + `Tried?name=` + this.state.queries.name + "&username=" + this.state.username);
                    } catch (error) {
                        console.log("error")
                    } finally {
                        console.log(response.data);
                        this.setState({tried: response.data})
                        if (response.data === false) {
                            this.state.html.push(<h5>You have not tried this food.<br></br></h5>)
                            this.state.html.push(<Link to={"Post_Tried?name=" + this.state.queries.name}>
                                <Button onClick={this.submitButton} type="button">
                                    I have tried this food
                                </Button>
                            </Link>)
                        } else {
                            this.state.html.push(<h5>You have tried this food.<br></br></h5>)
                            this.state.html.push(<Link to={"Post_Tried?name=" + this.state.queries.name}>
                                <Button onClick={this.submitButton} type="button">
                                    I have not tried this food
                                </Button>
                            </Link>)

                        }
                        this.state.html.push(<hr></hr>)
                    }
                }
                this.state.html.push(<h3>Nutrition Facts</h3>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<h5>Serving size: {this.state.data.servingSize}</h5>)
                this.state.html.push(<hr class="class-1"></hr>)
                this.state.html.push(<h5>Amount per serving<br></br></h5>)
                this.state.html.push(<h3>Calories: {this.state.data.calories}<br></br></h3>)
                this.state.html.push(<hr class="class-2"></hr>)
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
                this.state.html.push(<hr class="class-1"></hr>)
                this.state.html.push(<a>Calcium: {this.state.data.calcium}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Iron: {this.state.data.iron}<br></br></a>)
                this.state.html.push(<hr class="class-2"></hr>)
                this.state.html.push(<h5>Tags:<br></br></h5>)
                for (let i = 0; i < this.state.data.dietaryTags.length; i++) {
                    this.state.html.push(<a>• {this.state.data.dietaryTags[i]}<br></br></a>)
                }
                this.state.html.push(<hr></hr>)
                this.state.html.push(<h5>Diets:<br></br></h5>)
                for (let i = 0; i < this.state.data.diets.length; i++) {
                    this.state.html.push(<a>• {this.state.data.diets[i]}<br></br></a>)
                }
                this.state.html.push(<hr></hr>)
                this.state.html.push(<h5>Groups:</h5>)
                for (let i = 0; i < this.state.data.groups.length; i++) {
                    this.state.html.push(<a>• {this.state.data.groups[i]}<br></br></a>)
                }
                this.state.html.push(<hr></hr>)
                this.state.html.push(<h5>Cuisine:</h5>)
                this.state.html.push(<a>{this.state.data.cuisine}</a>)
                this.state.html.push(<hr class="class-2"></hr>)
                this.state.html.push(<a>Ingredients: {this.state.data.ingredients}</a>)
            }



            this.state.loading = false;
            this.forceUpdate();
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
                class={d.props.class}
            >{d.props.children}</d.type>);
        const adminItems = this.state.adminhtml.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                class={d.props.class}
            >{d.props.children}</d.type>);
        const loggedInItems = this.state.loggedInhtml.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                class={d.props.class}
            >{d.props.children}</d.type>);



        return (
            <div className="App">
                <Container style={{ paddingTop: '10vh', paddingBottom: '10vh'}}>
                    <div>
                        {adminItems}
                        {loggedInItems}
                    </div>
                    <div className="p-3 my-4 mx-4 bg-light border rounded w-50">
                        {listItems}
                    </div>
                </Container>
            </div>
        );
    }
    submitButton = (event) => {
        let link =
            "/Post_Tried?" +
            "name=" + this.state.queries.name +
            "&changeFrom=" + this.state.tried +
            "";
        this.state.html.push(<Redirect to={link}/>)
        this.forceUpdate()
    }
}