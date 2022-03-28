import React from "react";
import { Link, Redirect } from "react-router-dom"
import { Container } from "react-bootstrap";


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
function getMeal() {
    let date = new Date();
    let hour = date.getHours()
    let meal = ""
    if (hour < 10) {
        meal = "Breakfast"
    } else if (hour >= 10 && hour < 14) {
        meal = "Lunch"
    } else if (hour >= 14 && hour < 17) {
        meal = "LateLunch"
    } else {
        meal = "Dinner"
    }
    return meal;
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
            error: false,
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);
        if (this.state.queries.date == null) {
            this.state.queries.date = getToday();
        }
        //TODO: input check for date

        if (this.state.queries.meal == null) {
            this.state.queries.meal = getMeal();
        }
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
            response = await axios.get(url + `Dining_Court?name=` + this.state.queries.name + "&date=" + this.state.queries.date + "&meal=" + this.state.queries.meal);
        } catch (error) {
            console.log("error")
            this.setState({ error:true })
        } finally {
            console.log(response)
            console.log(this.state.error)
            if (this.state.error) {
                this.state.html.push(<h1>Error: Page not found</h1>);
            } else {
                console.log("a")
                this.state.html.push(<h1  style={{textAlignVertical: "center",textAlign: "center"}}>{this.state.queries.name.split('_').join(' ')}</h1>);
                let list = response.data[0]
                let k = 0;
                for (let i = 0; i < list.length; i++) {
                    this.state.html.push(<ColoredLine color="grey"/>);
                    this.state.html.push(<h3>{list[i][0]}</h3>);
                    for (let j = 1; j < list[i].length; j++) {
                        this.state.html.push(<Link id={"food" + k++} to={"/food?name=" + list[i][j]}>{list[i][j]}<br></br></Link>);
                    }
                    this.state.html.push(<a><br></br></a>)
                }
                // this.state.html.push(<a>{response.data[0][0]}</a>)
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
                    <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
                        <header className="p-3 my-4 mx-4 bg-light border rounded">
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
            >{d.props.children}</d.type>);
        return (
            <div className="App">
                <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
                    <header className="p-3 my-4 mx-4 bg-light border rounded">
                        {listItems}
                    </header>
                </Container>
            </div>
        );
    }
}