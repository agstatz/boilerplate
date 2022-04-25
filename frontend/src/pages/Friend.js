import React from "react";
import {Link, Redirect} from "react-router-dom";
import queryString from "query-string";

import { Container, Placeholder, Button } from "react-bootstrap";
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

export default class Friend extends React.Component {
  constructor() {
    super();
    this.state = {
      username: store.getState().app.username,
      res: "",
      html: [],
      html2: [],
      html3: [],
      admin: [],
      loading: true,
      logged: [],
    };
    this.callAPI = this.callAPI.bind(this);
    this.state.queries = queryString.parse(window.location.search);
  }

  componentDidMount() {
    this.callAPI();
  }
  submitButton = (event) => {
    console.log(event.target.value)
    let string =
        "/Post_Friend?request=accept&add=" +
        event.target.value +
        "&username=" +
        this.state.username
    this.state.html.push(<Redirect to={string} />);
    this.forceUpdate();
  };

  async callAPI() {
    this.setState({ loading: true });
    console.log(this.state.username)
    if (
        this.state.username == null ||
        this.state.username === "undefined" ||
        this.state.username === ""
    ) {
      this.state.html.push(<Redirect to={'/'} />);
      this.setState({ loading: false });
      this.forceUpdate();
    } else {
      let response;
      try {
        response = await axios.get(
          url +
            `Friends?username=` + this.state.username
        );
      } catch (error) {
        console.log("error");
      } finally {
        console.log(response.data[0][0])
        for (let i = 0; i < response.data[0][0].length; i++) {
          this.state.html.push(<ColoredLine id={"line" + i} color="grey"/>);
          this.state.html.push(
              <Link
                  id={"link" + i}
                  to={"/profile/" + response.data[0][0][i]}
              >
                {response.data[0][0][i]}
              </Link>
          );
        }
        if (response.data[0][0].length === 0 ) {
          this.state.html.push(<ColoredLine id={"fline"} color="grey"/>);
          this.state.html.push(<a>You do not have any friends.</a>)
        }
        if (response.data[0][1] == null || response.data[0][1] === "undefined" || response.data[0][1] === "") {
          response.data[0][1] = [];
        }
        for (let i = 0; i < response.data[0][1].length; i++) {
          this.state.html2.push(<ColoredLine id={"rline" + i} color="grey"/>);
          this.state.html2.push(
              <Link
                  id={"rlink" + i}
                  to={"/profile/" + response.data[0][1][i]}
              >
                {response.data[0][1][i]}
              </Link>
          );
          this.state.html2.push(
              <Button value={response.data[0][1][i]} onClick={this.submitButton}>Accept</Button>
          )
        }
        if (response.data[0][1].length === 0 ) {
          this.state.html2.push(<ColoredLine id={"fline"} color="grey"/>);
          this.state.html2.push(<a>You do not have any friend requests.</a>)
        }
        if (this.state.queries.message != null && this.state.queries.message !== "undefined" && this.state.queries.message !== "") {
          this.state.html3.push(
              <header className="App-header w-50 p-3 my-4 mx-4 bg-light border rounded" >
                <a>
                  <strong>
                    {this.state.queries.message}
                  </strong>
                </a>
              </header>
          )
        }

        this.setState({loading: false});
        this.forceUpdate();
      }
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <div className="App">

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
        className={d.props.className}
        onClick={d.props.onClick}
        value={d.props.value}
      >
        {d.props.children}
      </d.type>
    ));
    const listItems2 = this.state.html2.map((d) => (
        <d.type
            key={"list" + i++}
            to={d.props.to}
            id={d.key}
            style={d.props.style}
            color={d.props.color}
            className={d.props.className}
            onClick={d.props.onClick}
            value={d.props.value}
        >
          {d.props.children}
        </d.type>
    ));
    const listItems3 = this.state.html3.map((d) => (
        <d.type
            key={"list" + i++}
            to={d.props.to}
            id={d.key}
            style={d.props.style}
            color={d.props.color}
            className={d.props.className}
            onClick={d.props.onClick}
            value={d.props.value}
        >
          {d.props.children}
        </d.type>
    ));

    return (
      <div className="App">
        <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
          {listItems3}
          <div
            style={{
              textAlignVertical: "right",
              textAlign: "right",
              paddingRight: "40px",
            }}
          >
          </div>
          <form
            action="/Post_Friend"
            method="get"
            style={{
              textAlignVertical: "left",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            <label htmlFor="header-search">
              <span className="visually-hidden">Search</span>
            </label>
            <input
              type="text"
              id="header-search"
              placeholder="Friend Username"
              name="add"
              size="xl"
            />{" "}
            <Button type="submit">Add Friend</Button>{" "}
          </form>
          <header className="App-header w-50 p-3 my-4 mx-4 bg-light border rounded justify-content-center" >
            <h1
              className="App-title"
              style={{ textAlignVertical: "center", textAlign: "center" }}
            >
              <strong>List of Friends</strong>
            </h1>
            {listItems}
          </header>
          <header className="App-header w-50 p-3 my-4 mx-4 bg-light border rounded justify-content-center">
            <h1
                className="App-title"
                style={{ textAlignVertical: "center", textAlign: "center" }}
            >
              <strong>Friend Requests Received</strong>
            </h1>
            {listItems2}
          </header>
        </Container>
      </div>
    );
  }
}
