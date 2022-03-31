import React from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

import { Container, Placeholder, Button, Form } from "react-bootstrap";

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

export default class PostFoodUpdate extends React.Component {
  constructor() {
    super();
    this.state = {
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
    let response;
    try {
      console.log("posting");
      response = await axios.post(
        url +
          `Update_Food?` +
          "name=" +
          this.state.queries.name +
          "&newName=" +
          this.state.queries.newName +
          "&servingSize=" +
          this.state.queries.servingSize +
          "&calories=" +
          this.state.queries.calories +
          "&totalFat=" +
          this.state.queries.totalFat +
          "&saturatedFat=" +
          this.state.queries.saturatedFat +
          "&cholesterol=" +
          this.state.queries.cholesterol +
          "&sodium=" +
          this.state.queries.sodium +
          "&totalCarbohydrate=" +
          this.state.queries.totalCarbohydrate +
          "&dietaryFiber=" +
          this.state.queries.dietaryFiber +
          "&sugar=" +
          this.state.queries.sugar +
          "&addedSugar=" +
          this.state.queries.addedSugar +
          "&protein=" +
          this.state.queries.protein +
          "&calcium=" +
          this.state.queries.calcium +
          "&iron=" +
          this.state.queries.iron +
          "&diets=" +
          this.state.queries.diets +
          "&cuisine=" +
          this.state.queries.cuisine +
          "&ingredients=" +
          this.state.queries.ingredients +
          "&tags=" +
          this.state.queries.tags +
          "&groups=" +
          this.state.queries.groups +
          ""
      );
    } catch (error) {
      console.log("error");
    } finally {
      console.log(response);
      console.log(response.data);
      let link = "/Food?name=" + this.state.queries.newName;
      if (response.data === "Food with the same name already exists.") {
        link = "/Food?name=" + this.state.queries.name;
      }
      link += "&message=" + response.data;
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
    console.log(this.state.html[0].props.to);
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
