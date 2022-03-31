import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { Container, Placeholder, Button, Form } from "react-bootstrap";

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
            admin: [],
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
        let admin = true;
        try {
            response = await axios.get(
                url +
                `Foods?search=` + this.state.queries.search +
                "&tags=" + this.state.queries.tags +
                "&include=" + this.state.queries.include +
                "&exclude=" + this.state.queries.exclude);
        } catch (error) {
            console.log("error")
        } finally {
            for (let i = 0; i < response.data.length; i++) {
                this.state.html.push(<ColoredLine id={"line" + i} color="grey"/>);
                this.state.html.push(<Link id={"link" + i} to={"/food?name=" + response.data[i].split(' ').join('_')}>{response.data[i]}</Link>)
            }
            if (admin === true) {
                this.state.admin.push(<Link to={"Foods_Need_Update"}>
                    <Button type="button">
                        Foods That Need to Be Updated
                    </Button>
                    <br></br> <br></br>
                </Link>)
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
                        <Form action="/foods" method="get" style={{textAlignVertical: "right",textAlign: "right", paddingRight: "40px"}}>
                            <label htmlFor="header-search">
                                <span className="visually-hidden">Search</span>
                            </label>
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Search"
                                name="search"
                                size="xl"
                            />{' '}
                            <Button type="submit">Submit</Button>
                            {' '}
                            <Link to="/Search_Food">
                                <Button type="button">
                                    Advanced Search
                                </Button>
                            </Link>
                        </Form>
                        <header className="p-3 my-4 mx-4 bg-light border rounded">
                            <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}}><strong>List of Foods</strong></h1>
                            <Placeholder animation="gglow" size="lg">
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                            </Placeholder>
                        </header>
                    </Container>
                </div>
            )
        }
        let i = 0;
        const listItems = this.state.html.map((d) =>
            <d.type key={"list" + i++} to={d.props.to} id={d.key} style={d.props.style} color={d.props.color}>{d.props.children}</d.type>);
        const admin = this.state.admin.map((d) =>
            <d.type key={"list" + i++} to={d.props.to} id={d.key} style={d.props.style} color={d.props.color}>{d.props.children}</d.type>);
        return (
            <div className="App">
                <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
                    <div style={{textAlignVertical: "right",textAlign: "right", paddingRight: "40px"}}>
                        {admin}
                    </div>
                    <Form action="/foods" method="get" style={{textAlignVertical: "right",textAlign: "right", paddingRight: "40px"}}>
                        <Form.Label htmlFor="header-search">
                            <span className="visually-hidden">Search</span>
                        </Form.Label>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search"
                            name="search"
                            size="xl"
                        />{' '}
                        <Button type="submit">Submit</Button>{' '}
                        <Link to="/Search_Food">
                            <Button type="button">
                                Advanced Search
                            </Button>
                        </Link>
                    </Form>
                    <header className="p-3 my-4 mx-4 bg-light border rounded">
                        <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}}><strong>List of Foods</strong></h1>
                        {listItems}
                    </header>
                </Container>
            </div>
        );
    }

}