import React from "react";
import {Link, Redirect} from "react-router-dom";
import { Grid } from '@mui/material';
import queryString from "query-string";

import { Container, Placeholder, Button } from "react-bootstrap";

const url = 'http://localhost:3001/'

var ress;
const axios = require('axios')



export default class EditFood extends React.Component {
    constructor() {
        super();
        this.state = {
            res: "",
            loading: true,
            html: [],
            html2: [],
            html3: [],
            html4: [],
            html5: [],
            html6: [],
            adminhtml: [],
            loggedInhtml: [],
            tags: [],
            data: [],
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
    }

    componentDidMount() {
        this.callAPI();
    }

    handleOnChange = (position) => {
        console.log("handleonchange")
        if (position.target.checked) {//add to list
            this.state.tags.push(position.target.name)
        } else {//remove from list
            this.state.tags.splice(this.state.tags.indexOf(position.target.name),1);
        }
    };

    async callAPI() {
        this.state.loading = true;
        let loggedIn = true;
        let admin = true;
        if (!admin) {
            this.state.html.push(<h2>You do not have access to this page.</h2>)
            this.state.loading = false;
            this.forceUpdate();
            return;
        }

        try {
            var response = await axios.get(url + `food?name=` + this.state.queries.name);
        } catch (error) {
            console.log("error")
        } finally {
            console.log(response)
            if (response.data[0] == null) {
                this.state.html.push(<a>This food ({this.state.queries.name}) does not exist.</a>)
                this.state.loading = false;
                this.forceUpdate();
                return;
                console.log("NA")
            } else {
                this.setState({data: response.data[0]})
                console.log(this.state.data)
                this.state.html.push(<a>Food Name:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.name} id={"name"}></input>)
                this.state.html.push(<h3><br></br>Nutrition Facts</h3>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Serving size:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.servingSize} id={"servingSize"}></input>)
                this.state.html.push(<hr class="class-1"></hr>)
                this.state.html.push(<a>Amount per serving<br></br></a>)
                this.state.html.push(<a>Calories:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.calories} id={"calories"}></input>)
                this.state.html.push(<hr class="class-2"></hr>)
                this.state.html.push(<a>Total Fat:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.totalFat} id={"totalFat"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Saturated Fat:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.saturatedFat} id={"saturatedFat"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Cholesterol:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.cholesterol} id={"cholesterol"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Sodium:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.sodium} id={"sodium"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Total Carbohydrate:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.totalCarbohydrate} id={"totalCarbohydrate"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Dietary Fiber:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.dietaryFiber} id={"dietaryFiber"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Sugar:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.sugar} id={"sugar"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Added Sugar:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.addedSugar} id={"addedSugar"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Protein:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.protein} id={"protein"}></input>)
                this.state.html.push(<hr class="class-1"></hr>)
                this.state.html.push(<a>Calcium:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.calcium} id={"calcium"}></input>)
                this.state.html.push(<hr></hr>)
                this.state.html.push(<a>Iron:</a>)
                this.state.html.push(<input class={"form-control"} defaultValue={this.state.data.iron} id={"iron"}></input>)
                this.state.html.push(<hr class="class-2"></hr>)
                this.state.html3.push(<a>Tags:</a>)
                this.state.html4.push(<hr></hr>)
                this.state.html4.push(<a>Diets:</a>)
                this.state.html5.push(<hr></hr>)
                this.state.html5.push(<a>Groups:</a>)
                this.state.html6.push(<hr></hr>)
                this.state.html6.push(<a>Cuisine:</a>)
                this.state.html2.push(<hr class="class-2"></hr>)
                this.state.html2.push(<a>Ingredients:</a>)
                this.state.html2.push(<textarea class={"form-control"} defaultValue={this.state.data.ingredients} id={"ingredients"}></textarea>)
                this.state.html2.push(<br></br>)
            }
            try {
                response = await axios.get(url + `Tags`);
            } catch (error) {
                console.log("error")
            } finally {
                for (let i = 0; i < response.data.length; i++) {
                    this.state.html3.push(
                        <div className={response.data[i]}
                             onChange={this.handleOnChange}>
                            <input
                                type={"checkbox"}
                                id={"box" + i}
                                name={response.data[i]}
                                value={response.data[i]}
                                checked={this.state.isChecked}
                            />
                            {" " + response.data[i]}
                        </div>)
                }
            }
            try {
                response = await axios.get(url + `Diet`);
            } catch (error) {
                console.log("error")
            } finally {
                this.setState({diet : response})
                this.setState({dietSelected : this.state.diet.data[0]})
                let toPush = <select class="form-select" id="diet" onChange={this.handleDrop3}></select>;
                let clonedToPush = React.cloneElement(
                    toPush,
                    { children: [] }
                );
                for (let i = 1; i < this.state.diet.data.length; i++) {
                    clonedToPush.props.children.push(<option value={this.state.diet.data[i]}>{this.state.diet.data[i]}</option>)
                }
                this.state.html4.push(clonedToPush)
            }
            try {
                response = await axios.get(url + `Group`);
            } catch (error) {
                console.log("error")
            } finally {
                this.setState({group : response})
                this.setState({groupSelected : this.state.group.data[0]})
                let toPush = <select class="form-select" id="group" onChange={this.handleDrop4}></select>;
                let clonedToPush = React.cloneElement(
                    toPush,
                    { children: [] }
                );
                for (let i = 0; i < this.state.group.data.length; i++) {
                    clonedToPush.props.children.push(<option value={this.state.group.data[i]}>{this.state.group.data[i]}</option>)
                }
                this.state.html5.push(clonedToPush)
            }
            try {
                response = await axios.get(url + `Cuisine_Edit`);
            } catch (error) {
                console.log("error")
            } finally {
                this.setState({cuisine : response})
                this.setState({cuisineSelected : this.state.cuisine.data[0]})
                let toPush = <select class="form-select" id="cuisine" onChange={this.handleDrop5}></select>;
                let clonedToPush = React.cloneElement(
                    toPush,
                    { children: [] }
                );
                for (let i = 1; i < this.state.cuisine.data.length; i++) {
                    clonedToPush.props.children.push(<option value={this.state.cuisine.data[i]}>{this.state.cuisine.data[i]}</option>)
                }
                this.state.html6.push(clonedToPush)
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
                to={d.props.to} id={d.props.id} style={d.props.style}
                class={d.props.class} defaultValue={d.props.defaultValue}
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);
        const listItems2 = this.state.html2.map((d) =>
            <d.type
                key={"list" + i++}
                to={d.props.to} id={d.props.id} style={d.props.style}
                class={d.props.class} defaultValue={d.props.defaultValue}
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);
        const listItems3 = this.state.html3.map((d) =>
            <d.type
                key={"list" + i++}
                to={d.props.to} id={d.props.id} style={d.props.style}
                class={d.props.class} defaultValue={d.props.defaultValue}
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);
        const listItems4 = this.state.html4.map((d) =>
            <d.type
                key={"list" + i++}
                to={d.props.to} id={d.props.id} style={d.props.style}
                class={d.props.class} defaultValue={d.props.defaultValue}
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);
        const listItems5 = this.state.html5.map((d) =>
            <d.type
                key={"list" + i++}
                to={d.props.to} id={d.props.id} style={d.props.style}
                class={d.props.class} defaultValue={d.props.defaultValue}
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);
        const listItems6 = this.state.html6.map((d) =>
            <d.type
                key={"list" + i++}
                to={d.props.to} id={d.props.id} style={d.props.style}
                class={d.props.class} defaultValue={d.props.defaultValue}
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);


        return (
            <div className="App">
                <Container style={{ paddingTop: '10vh', paddingBottom: '10vh'}}>
                    <div className="p-3 my-4 mx-4 bg-light border rounded w-50">
                        {listItems}
                        {listItems3}
                        {listItems4}
                        {listItems5}
                        {listItems6}
                        {listItems2}
                        <Button onClick={this.submitButton}>Submit</Button>
                    </div>
                </Container>
            </div>
        );
    }
    submitButton = (event) => {
        let string = [];
        string.push(document.getElementById("name").value)
        string.push(document.getElementById("servingSize").value)
        let response;
        console.log(this.state.tags)
        try {
            response = axios.post(url + `Update_Food?` +
                "name=" + this.state.data.name +
                "&newName=" + document.getElementById("name").value +
                "&servingSize=" + document.getElementById("servingSize").value +
                "&calories=" + document.getElementById("calories").value +
                "&totalFat=" + document.getElementById("totalFat").value +
                "&saturatedFat=" + document.getElementById("saturatedFat").value +
                "&cholesterol=" + document.getElementById("cholesterol").value +
                "&sodium=" + document.getElementById("sodium").value +
                "&totalCarbohydrate=" + document.getElementById("totalCarbohydrate").value +
                "&dietaryFiber=" + document.getElementById("dietaryFiber").value +
                "&sugar=" + document.getElementById("sugar").value +
                "&addedSugar=" + document.getElementById("addedSugar").value +
                "&protein=" + document.getElementById("protein").value +
                "&calcium=" + document.getElementById("calcium").value +
                "&iron=" + document.getElementById("iron").value +
                "&diet=" + document.getElementById("diet").value +
                "&cuisine=" + document.getElementById("cuisine").value +
                "&ingredients=" + document.getElementById("ingredients").value +
                "&tags=" + this.state.tags +
                ""
            );
        } catch (error) {
            console.log("error")
        } finally {
            console.log(response);
        }

        console.log(string);
        this.forceUpdate()
    }

}