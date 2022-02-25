import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom"


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

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

const axios = require('axios')
const queryString = require('query-string');
const url = "http://localhost:3001/"

export default class Dining_Court extends React.Component {

    constructor() {
        super();
        this.state = {
            res: "",
            html: [],
            loading: true,
            queries: [],
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
        if (this.state.queries.date == null) {
            this.state.queries.date = getToday();
        }
        //TODO: input check for date
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        this.callAPI();
        //window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        //window.removeEventListener('resize', this.updateDimensions);
    }

    async callAPI() {
        this.state.loading = true;
        let response
        try {
            response = await axios.get(url + `Dining_Court?name=` + this.state.queries.name + "&date=" + this.state.queries.date);
        } catch (error) {
            console.log("error")
        } finally {
            for (let i = 0; i < response.data.length; i++) {
                let key = "link" + i;
                let keyLine = "link" + i;
                let name = response.data[i].name;
                this.state.html.push(<ColoredLine id={keyLine} color="grey"/>);
                this.state.html.push(<NavLink to={"/Dining_Court?name=" + name.split(' ').join('_')}>
                    <img
                        id={name} alt={name} src={url + "Picture?picturename=" + name.split(' ').join('_')} //height={"200"} width={"200"}
                    />
                </NavLink>);
                this.state.html.push(<Link id={key} to={"/" + name.split(' ').join('_')}>{name}</Link>)
            }
            this.state.loading = false;
            this.forceUpdate();
        }

    }

    render() {
        if (this.state.queries.name == null) {
            return (
                <Redirect to="/dining-courts" push />
            )
        }

        if (this.state.loading) {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">hello</h1>
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
                    <h1 className="App-title" /*style={{textAlignVertical: "center",textAlign: "center",}}*/>Dining Courts</h1>
                    {listItems}
                </header>
            </div>
        );
    }
}