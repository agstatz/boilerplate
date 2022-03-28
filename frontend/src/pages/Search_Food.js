import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Button } from "react-bootstrap";


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
            onList: [],
            include: [],
            exclude: [],
            loading: true,
            width: window.innerWidth,
            tags: [],
            nutrition: [],
            nutritionSelected: "",
        };
        this.callAPI = this.callAPI.bind(this);
    }
    updateDimensions = () => {
        // this.setState({width : window.innerWidth})
        // let i = 0;
        // while (true) {
        //     let element = document.getElementById("picture" + i)
        //     i++;
        //     if (element == null) {
        //         break;
        //     }
        //     element.width = this.state.width*0.8
        //     element.height = this.state.width*0.8*0.5625
        // }
    };

    componentDidMount() {
        this.callAPI();
        window.addEventListener('resize', this.updateDimensions);
    }

    handleOnChange = (position) => {
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
            this.setState({loading : false})
            this.forceUpdate();
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="App">
                <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
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
                onChange={d.props.onChange}
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
                onChange={d.props.onChange}
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
                onChange={d.props.onChange}
            >{d.props.children}</d.type>);

        return (
            <div className="App">
                <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
                    <header className="p-3 my-4 mx-4 bg-light border rounded">
                        <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}} ><strong>Advanced Search</strong></h1>
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
                            <a><br></br>Nutrition</a>
                        </div>
                        <div style={{
                            width: '50%',
                            margin: '0 auto',
                            alignItems: 'center'}}>
                            {listItems2}{' '}
                            <Button onClick={this.addButton} size="sm">
                                Add
                            </Button>
                            {listItems3}
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

    addButton = (event) => {
        if (this.state.onList.indexOf(this.state.nutritionSelected) == -1) {
            this.state.onList.push(this.state.nutritionSelected);
            let toPush = <div id={"nutrition" + this.state.index}></div>;
            let clonedToPush = React.cloneElement(
                toPush,
                { children: [] }
            );
            clonedToPush.props.children.push(
                <select id={"drop"+ this.state.index} onChange={this.handleDrop2} >
                    <option value="include">Include</option>
                    <option value="exclude">Exclude</option>
                </select>
            );
            clonedToPush.props.children.push(" " + this.state.nutritionSelected + " ");
            clonedToPush.props.children.push(<Button style={{
                borderLeft: '2px solid grey',
                borderRight: '2px solid grey',
                borderTop: '2px solid grey',
                textAlign: 'right'
            }} value={this.state.index} onClick={this.removeButton}>Remove</Button>);
            this.state.include.push(this.state.nutritionSelected);
            this.state.html3.push(clonedToPush);
            this.state.index++;
            this.forceUpdate();
        }
    }

    removeButton = (event) => {
        let string = this.state.html3.pop({id : "drop" + event.target.value}).props.children[1]
        string = string.substring(1, string.length - 1);
        this.state.onList.pop(string);
        this.state.include.pop(string);
        this.state.exclude.pop(string);
        this.forceUpdate()
    }

    submitButton = (event) => {
        let string =
            "/foods?search=" +
            document.getElementById("search").value +
            "&tags=" + this.state.tags +
            "&include=" + this.state.include +
            "&exclude=" + this.state.exclude;
        console.log(string)
        this.state.html.push(<Redirect to={string}/>)
        this.forceUpdate()
    }
}