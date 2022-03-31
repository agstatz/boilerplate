import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { Container, Placeholder, Button } from "react-bootstrap";
import {store} from "../store/store";

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

export default class FoodsTried extends React.Component {

    constructor() {
        super();
        this.state = {
            username: store.getState().app.username,
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
                "Foods_Tried?username=" + this.state.username);
        } catch (error) {
            console.log("error")
        } finally {
            for (let i = 0; i < response.data.length; i++) {
                this.state.html.push(<ColoredLine id={"line" + i} color="grey"/>);
                this.state.html.push(<Link id={"link" + i} to={"/food?name=" + response.data[i][0].split(' ').join('_')}>{response.data[i]}</Link>)
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

                <header className="App-header p-3 my-4 mx-4 bg-light border rounded">
                    <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}}><strong>Foods That You Have Tried</strong></h1>
                    <Placeholder animation="glow" size="lg">
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
        return (
            <div className="App">
                <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >


                <header className="App-header p-3 my-4 mx-4 bg-light border rounded">
                    <h1 className="App-title" style={{textAlignVertical: "center",textAlign: "center"}}><strong>Foods That You Have Tried</strong></h1>
                    {listItems}
                </header>
                </Container>
            </div>
        );
    }

}