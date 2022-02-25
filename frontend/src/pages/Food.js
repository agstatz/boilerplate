import React from "react";
import { Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';
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
        this.state.queries = queryString.parse(window.location.search);
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
                    <header className="App-header">
                        <h1 className="App-title">AAA</h1>
                    </header>
                </div>
            )
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">{this.state.res}{ress}BAB</h1>
                    <a onClick={this.handleClick} style={{cursor: 'pointer'}}>click me!</a>
                    <div><Link to="/home">Click here to go back to home page</Link></div>
                </header>
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