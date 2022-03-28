import React from "react";
import { Stack, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import queryString from "query-string";

const url = 'http://localhost:3001/'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

var ress;
const axios = require('axios')


export default class Food extends React.Component {
    constructor() {
        super();
        this.state = {
            res: "",
            loading: true
        };
        this.callAPI = this.callAPI.bind(this);
        this.state.name = window.location.search.substring(1).split('_').join(' ');
    }

    componentDidMount() {
        this.callAPI();
    }

    async callAPI() {
        this.state.loading = true;
        try {
            var response = await axios.get(url + `food?name=` + this.state.queries.name);
        } catch (error) {
            console.log("error")
        } finally {
            const ress = response.data[0].name;
            this.state.res = ress;
            this.state.loading = false;
            this.forceUpdate()
        }

    }

    render() {
        if (this.state.loading) {
            return (
                <div className="App">
                    <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
                        <header className="p-3 my-4 mx-4 bg-light border rounded">
                            <h2><strong>{this.state.name}</strong></h2>
                        </header>
                    </Container>
                </div>
            )
        }

        return (
            <div className="App">
                    <Container style={{ paddingTop: '18vh', paddingBottom: '18vh'}} >
                        <header className="p-3 my-4 mx-4 bg-light border rounded">
                            <h2><strong>{this.state.name}</strong></h2>
                        </header>
                    </Container>
                </div>
        );
        var App = React.createClass({
            render: function() {
                return (
                    <div>
                        <h1>App main component! </h1>
                        {
                            this.props.children
                        }
                    </div>
                );
            }
        });
    }
}