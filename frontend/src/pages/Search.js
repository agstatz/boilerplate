import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

const axios = require('axios')
const url = "http://localhost:3001/"
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default class Foods extends React.Component {

    constructor() {
        super();
        this.state = {
            res: "",
            html: [],
            loading: true
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.queries = queryString.parse(window.location.search);

    }

    componentDidMount() {
        this.callAPI();
    }


    async callAPI() {
        this.setState({loading : true})
        let response;
        try {
            response = await axios.get(
                url +
                `Foods?search=` + this.state.queries.search
                +
                "&tags=" + this.state.queries.tags +
                "&include=" + this.state.queries.include +
                "&exclude=" + this.state.queries.exclude);
        } catch (error) {
            console.log("error")
        } finally {
            for (let i = 0; i < response.data.length; i++) {
                this.state.html.push(<ColoredLine id={"line" + i} color="grey"/>);
                this.state.html.push(<Link id={"link" + i} to={"/food?" + response.data[i].split(' ').join('_')}>{response.data[i]}</Link>)
            }
            this.setState({loading : false})
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
            <d.type key={"list" + i++} to={d.props.to} id={d.key} style={d.props.style} color={d.props.color}>{d.props.children}</d.type>);
        return (
            <div className="App">

                <form action="/foods" method="get" style={{textAlignVertical: "right",textAlign: "right"}}>
                    <label htmlFor="header-search">
                        <span className="visually-hidden">Search</span>
                    </label>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Search"
                        name="search"
                    />
                    <button type="submit">Submit</button>
                    <Link to="/Search_Food">
                        <button type="button">
                            Advanced Search
                        </button>
                    </Link>
                </form>
                <header className="p-3 my-4 mx-4 bg-light border rounded">
                    <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}}>List of Food</h1>
                    {listItems}
                </header>
            </div>
        );
    }

}