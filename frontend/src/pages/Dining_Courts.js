import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);
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

export default class Dining_Courts extends React.Component {

    constructor() {
        super();
        this.state = {
            res: "",
            html: [],
            loading: true,
            width: window.innerWidth,
        };
        this.callAPI = this.callAPI.bind(this);
    }
    updateDimensions = () => {
        this.setState({width : window.innerWidth})
        let i = 0;
        while (true) {
            let element = document.getElementById("picture" + i)
            i++;
            if (element == null) {
                break;
            }
            element.width = this.state.width*0.8
            element.height = this.state.width*0.8*0.5625
        }
    };

    componentDidMount() {
        this.callAPI();
        window.addEventListener('resize', this.updateDimensions);
    }

    async callAPI() {
        this.setState({loading :  true})
        let response
        try {
            response = await axios.get(url + `Dining_Courts`);
        } catch (error) {
            console.log("error")
        } finally {
            for (let i = 0; i < response.data.length; i++) {
                let name = response.data[i].name;
                this.state.html.push(<ColoredLine  id={"line" + i} color="grey"/>);
                this.state.html.push(<NavLink id={"pictureLink" + i}to={"/Dining_Court?name=" + name.split(' ').join('_') + "&date=" + getToday()}>
                    <img
                        id={"picture" + i} alt={name} src={url + "Picture?picturename=" + name.split(' ').join('_')} width={this.state.width*0.8} height={this.state.width*0.8*0.5625} //height={"200"} width={"200"}
                    />
                </NavLink>);
                this.state.html.push(<Link id={"link" + i} to={"/Dining_Court?name=" + name.split(' ').join('_') + "&date=" + getToday()}>{name}</Link>)
            }
            this.setState({loading :  false})
            this.forceUpdate();
        }

    }

    render() {
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
            >{d.props.children}</d.type>);

        return (
            <div className="App">

                <header className="App-header">
                    <h1 key={"class"} className="App-title" style={{textAlignVertical: "center",textAlign: "center",}}>Dining Courts</h1>
                    {listItems}
                </header>
            </div>
        );
    }
}