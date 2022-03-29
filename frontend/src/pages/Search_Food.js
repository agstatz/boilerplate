import React from "react";
import {Link, Redirect} from "react-router-dom";

import { Container, Placeholder, Button, Form } from "react-bootstrap";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

const Border = ({color}) => (
    <div>
        style={
        {
            border: '3px rgb(86, 10, 10) solid',
            ping: '9px',
        }
    }
    </div>
)

const id = "aabcd"
const url = 'http://localhost:3001/'
const axios = require('axios')

function getToday() {
    let date = new Date();
    let today = "";
    today += date.getFullYear()
    if ((date.getMonth() + 1) > 9) {
        today += (date.getMonth() + 1);
    } else {
        today += "0" + (date.getMonth() + 1);
    }
    if (date.getDate() > 9) {
        today += date.getDate();
    } else {
        today += "0" + date.getDate();
    }
    return today
}





export default class Search_Food extends React.Component {

    constructor() {
        super();
        this.state = {
            index: 0,
            res: "",
            html: [],
            html2: [],
            html3: [],
            html4: [],
            html5: [],
            html6: [],
            onList: [],
            include: [],
            exclude: [],
            loading: true,
            width: window.innerWidth,
            tags: [],
            nutrition: [],
            nutritionSelected: "",
            cuisine: [],
            cuisineSelected: "",
            group: [],
            groupSelected: "",
            diet: [],
            dietSelected: "",
        };
        this.callAPI = this.callAPI.bind(this);
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
        this.setState({loading : true})
        let response
        try {
            response = await axios.get(url + `Tags`);
        } catch (error) {
            console.log("error")
        } finally {
            for (let i = 0; i < response.data.length; i++) {
                if (i == 0) {//top
                    this.state.html.push(
                        <div className={response.data[i]}
                             onChange={this.handleOnChange}
                             style={{
                                 borderLeft: '2px solid grey',
                                 borderRight: '2px solid grey',
                                 borderTop: '2px solid grey'
                             }}>
                            <input
                                type={"checkbox"}
                                id={"box" + i}
                                name={response.data[i]}
                                value={response.data[i]}
                                checked={this.state.isChecked}
                            />
                            {" " + response.data[i]}
                        </div>)
                } else if (i == response.data.length - 1) {//bottom
                    this.state.html.push(
                        <div className={response.data[i]}
                             onChange={this.handleOnChange}
                             style={{
                                 borderLeft: '2px solid grey',
                                 borderRight: '2px solid grey',
                                 borderBottom: '2px solid grey'
                             }}>
                            <input
                                type={"checkbox"}
                                id={"box" + i}
                                name={response.data[i]}
                                value={response.data[i]}
                                checked={this.state.isChecked}
                            />
                            {" " + response.data[i]}
                        </div>)
                } else {
                    this.state.html.push(
                        <div className={response.data[i]}
                             onChange={this.handleOnChange}
                             style={{
                                 borderLeft: '2px solid grey',
                                 borderRight: '2px solid grey'
                             }}>
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
                response = await axios.get(url + `Nutrition`);
            } catch (error) {
                console.log("error")
            } finally {
                this.setState({nutrition: response})
                this.setState({nutritionSelected: this.state.nutrition.data[0]})
                let toPush = <select id="drop" onChange={this.handleDrop}></select>;
                let clonedToPush = React.cloneElement(
                    toPush,
                    { children: [] }
                );
                for (let i = 0; i < this.state.nutrition.data.length; i++) {
                    clonedToPush.props.children.push(<option value={this.state.nutrition.data[i]}>{this.state.nutrition.data[i]}</option>)
                }
                this.state.html2.push(clonedToPush)
            }
            try {
                response = await axios.get(url + `Diet`);
            } catch (error) {
                console.log("error")
            } finally {
                this.setState({diet : response})
                this.setState({dietSelected : this.state.diet.data[0]})
                let toPush = <select class="form-select" id="drop2" onChange={this.handleDrop3}></select>;
                let clonedToPush = React.cloneElement(
                    toPush,
                    { children: [] }
                );
                for (let i = 0; i < this.state.diet.data.length; i++) {
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
                let toPush = <select class="form-select" id="drop3" onChange={this.handleDrop4}></select>;
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
                response = await axios.get(url + `Cuisine`);
            } catch (error) {
                console.log("error")
            } finally {
                this.setState({cuisine : response})
                this.setState({cuisineSelected : this.state.cuisine.data[0]})
                let toPush = <select class="form-select" id="drop4" onChange={this.handleDrop5}></select>;
                let clonedToPush = React.cloneElement(
                    toPush,
                    { children: [] }
                );
                for (let i = 0; i < this.state.cuisine.data.length; i++) {
                    clonedToPush.props.children.push(<option value={this.state.cuisine.data[i]}>{this.state.cuisine.data[i]}</option>)
                }
                this.state.html6.push(clonedToPush)
            }
            this.setState({loading : false})
            this.forceUpdate();
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="App">
                <Container style={{ paddingTop: '8vh', paddingBottom: '8vh'}} >
                    <header className="p-3 my-4 mx-4 bg-light border rounded">
                        <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}} ><strong>Advanced Search</strong></h1>
                        <ColoredLine color="grey"></ColoredLine>

                    </header>
                </Container>
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
                type={d.props.type} name={d.props.name}
                value={d.props.value} checked={d.props.checked}
                onChange={d.props.onChange} class={d.props.class}
            >{d.props.children}</d.type>);

        const listItems2 = this.state.html2.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                type={d.props.type} name={d.props.name}
                value={d.props.value} checked={d.props.checked}
                onChange={d.props.onChange} class={d.props.class}
            >{d.props.children}</d.type>);
        const listItems3 = this.state.html3.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                type={d.props.type} name={d.props.name}
                value={d.props.value} checked={d.props.checked}
                onChange={d.props.onChange} class={d.props.class}
            >{d.props.children}</d.type>);
        const listItems4 = this.state.html4.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                type={d.props.type} name={d.props.name}
                value={d.props.value} checked={d.props.checked}
                onChange={d.props.onChange} class={d.props.class}
            >{d.props.children}</d.type>);
        const listItems5 = this.state.html5.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                type={d.props.type} name={d.props.name}
                value={d.props.value} checked={d.props.checked}
                onChange={d.props.onChange} class={d.props.class}
            >{d.props.children}</d.type>);
        const listItems6 = this.state.html6.map((d) =>
            <d.type
                key={"list" + i++}
                src={d.props.src} alt={d.props.name}
                to={d.props.to} id={d.key} style={d.props.style}
                color={d.props.color}
                height={d.props.height} width={d.props.height}
                type={d.props.type} name={d.props.name}
                value={d.props.value} checked={d.props.checked}
                onChange={d.props.onChange} class={d.props.class}
            >{d.props.children}</d.type>);

        return (
            <div className="App">
                <Container style={{ paddingTop: '8vh', paddingBottom: '8vh'}} >
                <header className="p-3 my-4 mx-4 bg-light border rounded">

                    <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}} >Advanced Search</h1>
                    <ColoredLine color="grey"></ColoredLine>
                    <div style={{
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center'}}>
                        <input
                            type="text"
                            id="search"
                            placeholder="Food Name"
                            name="search"
                        />
                    </div>
                    <div style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                        <a><br></br>Tags</a>
                    </div>
                    <div style={{
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center'}}>
                        {listItems}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <a><br></br>Diet</a>
                    </div>
                    <div style={{
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center'}}>
                        {listItems4}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <a><br></br>Group</a>
                    </div>
                    <div style={{
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center'}}>
                        {listItems5}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <a><br></br>Cuisine</a>
                    </div>
                    <div style={{
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center'}}>
                        {listItems6}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <a><br></br>Nutrition</a>
                    </div>
                    <div style={{
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center'}}>
                        <div class={"input-group"}>
                            {listItems2}
                            <Button onClick={this.addButton}>
                                Add
                            </Button>
                        </div>
                        <div class={"input-group"}>
                        {listItems3}
                        </div>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        <a>
                            <br></br>
                            <Button onClick={this.submitButton}>Submit</Button>
                        </a>
                    </div>
                </header>
                </Container>
            </div>
        );
    }
    handleDrop = (event) => {
        this.setState({ nutritionSelected : event.target.value })
    }

    handleDrop2 = (event) => {
        let string = this.state.html3.find(a => a.props.id == "nutrition" + event.target.id.substring(4)).props.children[1]
        string = string.substring(1, string.length - 1);
        if (event.target.value == "exclude") {
            this.state.include.pop(string)
            this.state.exclude.push(string)
        } else {
            this.state.include.push(string)
            this.state.exclude.pop(string)
        }
    }

    handleDrop3 = (event) => {
        this.setState({ dietSelected : event.target.value })
    }
    handleDrop4 = (event) => {
        this.setState({ groupSelected : event.target.value })
    }
    handleDrop5 = (event) => {
        this.setState({ cuisineSelected : event.target.value })
    }

    addButton = (event) => {
        if (this.state.onList.indexOf(this.state.nutritionSelected) == -1) {
            this.state.onList.push(this.state.nutritionSelected);
            let toPush = <div class={"input-group"} id={"nutrition" + this.state.index}></div>;
            let clonedToPush = React.cloneElement(
                toPush,
                { children: [] }
            );
            clonedToPush.props.children.push(
                <select class="form-select w-25" id={"drop"+ this.state.index} onChange={this.handleDrop2} >
                    <option value="include">Include</option>
                    <option value="exclude">Exclude</option>
                </select>
            );
            clonedToPush.props.children.push(<a class="btn btn-static w-50 text-left">{this.state.nutritionSelected}</a>);
            clonedToPush.props.children.push(<Button
                value={this.state.index} onClick={this.removeButton}>Remove</Button>);
            this.state.include.push(this.state.nutritionSelected);
            this.state.html3.push(clonedToPush);
            this.state.index++;
            this.forceUpdate();
        }
    }

    removeButton = (event) => {
        console.log("removebutton")
        let string = this.state.html3.pop({id : "drop" + event.target.value}).props.children[1].props.children
        console.log(string)
        string = string.substring(1, string.length - 1);
        this.state.onList.pop(string);
        this.state.include.pop(string);
        this.state.exclude.pop(string);
        console.log("updating");
        this.forceUpdate();
    }

    submitButton = (event) => {
        let string =
            "/foods?search=" +
            document.getElementById("search").value +
            "&tags=" + this.state.tags +
            "&include=" + this.state.include +
            "&exclude=" + this.state.exclude +
            "&diet=" + this.state.dietSelected +
            "&group=" + this.state.groupSelected +
            "&cuisine=" + this.state.cuisineSelected;
        console.log(string)
        this.state.html.push(<Redirect to={string}/>)
        this.forceUpdate()
    }
}