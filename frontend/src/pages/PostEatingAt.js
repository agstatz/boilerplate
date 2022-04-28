import React from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

import { Container, Placeholder, Button, Form } from "react-bootstrap";
import { store, ClearForm, UpdateForm } from "../store/store";

const axios = require("axios");
const url = "http://localhost:3001/";
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
    }}
  />
);

export default class PostEatingAt extends React.Component {
  constructor() {
    super();
    this.state = {
      username: store.getState().app.username,
      res: "",
      html: [],
      loading: true,
    };
    this.callAPI = this.callAPI.bind(this);
    this.state.queries = queryString.parse(window.location.search);
  }

  componentDidMount() {
    this.callAPI();
  }

  async callAPI() {
    this.setState({ loading: true });
    console.log(this.state.username)
    let response;
    if (
      this.state.username != null &&
      this.state.username !== "undefined" &&
      this.state.username !== ""
    ) {
      try {
        console.log("posting");
        response = await axios.post(
          url +
            `Post_Eating_At?` +
            "username=" +
            this.state.username +
            "&location=" +
            this.state.queries.location.split("_").join(" ") +
            ""
        );
      } catch (error) {
        console.log(error);
      } finally {
        console.log(response);
        let link = "/Dining_Court?name=" + this.state.queries.location +
            "&date=" + this.state.queries.date +
            "&meal=" + this.state.queries.meal;
        this.state.html.push(<Redirect to={link} />);
        this.setState({ loading: false });
        this.forceUpdate();
      }
    } else {
      let link = "/";
      this.state.html.push(<Redirect to={link} />);
      this.setState({ loading: false });
      this.forceUpdate();
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="App">
          <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
            <header className="p-3 my-4 mx-4 bg-light border rounded">
              <h1
                className="App-title"
                style={{ textAlignVertical: "center", textAlign: "center" }}
              >
                <strong>Submitting...</strong>
              </h1>
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
      );
    }
    let i = 0;
    const listItems = this.state.html.map((d) => (
      <d.type
        key={"list" + i++}
        to={d.props.to}
        id={d.key}
        style={d.props.style}
        color={d.props.color}
      >
        {d.props.children}
      </d.type>
    ));
    return (
      <div className="App">
        <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
          {listItems}
        </Container>
      </div>
    );
  }
}
