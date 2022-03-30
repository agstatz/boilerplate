import React from "react";
import {Link, Redirect} from "react-router-dom";
import { Grid } from '@mui/material';
import queryString from "query-string";

import { Container, Placeholder, Button } from "react-bootstrap";

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
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
    }

    componentDidMount() {
        this.callAPI();
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
            console.log(response)
            if (response.data[0] == null) {
                this.state.html.push(<a>This food ({this.state.queries.name}) does not exist.</a>)
                console.log("NA")
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
                console.log(this.state.data)
                this.state.html.push(<h1>{this.state.data.name}</h1>)
                this.state.html.push(<h3><br></br>Nutrition Facts</h3>)
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
                this.state.html.push(<a>Tags: {this.state.data.tags}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Diets: {this.state.data.diet}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Groups: {this.state.data.group}<br></br></a>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Cuisine: {this.state.data.cuisine}<br></br></a>)
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
}