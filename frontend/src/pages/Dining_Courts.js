import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { Container, Placeholder } from "react-bootstrap";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
    }}
  />
);
const url = "http://localhost:3001/";
const axios = require("axios");

function getToday() {
  let date = new Date();
  let today = "";
  today += date.getMonth() + 1;
  today += "-" + date.getDate()
  // if (date.getMonth() + 1 > 9) {
  //   today += date.getMonth() + 1;
  // } else {
  //   today += "0" + (date.getMonth() + 1);
  // }
  // today += "-"
  // if (date.getDate() > 9) {
  //   today += date.getDate();
  // } else {
  //   today += "0" + date.getDate();
  // }
  today += "-" + date.getFullYear();
  return today;
}

function getMeal() {
  let date = new Date();
  let hour = date.getHours();
  let meal = "";
  if (hour < 10) {
    meal = "Breakfast";
  } else if (hour >= 10 && hour < 14) {
    meal = "Lunch";
  } else if (hour >= 14 && hour < 17) {
    meal = "Late Lunch";
  } else {
    meal = "Dinner";
  }
  return meal;
}

export default class Dining_Courts extends React.Component {
  constructor() {
    super();
    this.state = {
      res: "",
      html: [],
      loading: true,
      width: window.innerWidth,
      onthego: ""
    };
    this.callAPI = this.callAPI.bind(this);
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    let i = 0;
    while (true) {
      let element = document.getElementById("picture" + i);
      i++;
      if (element == null) {
        break;
      }
      element.width = this.state.width * 0.5;
      element.height = this.state.width * 0.5 * 0.5625;
    }
  };

  componentDidMount() {
    this.callAPI();
    window.addEventListener("resize", this.updateDimensions);
  }

  async callAPI() {
    this.setState({ loading: true });
    let response;

    try {
      response = await axios.get(url + `Dining_Courts`);
    } catch (error) {
      console.log("error");
    } finally {
      let date = getToday();
      let meal = getMeal();
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i])
        let name = response.data[i];
        this.state.html.push(<ColoredLine id={"line" + i} color="grey" />);
        let to = ""
        if (name.charAt(name.length - 1) === "!") {
          to = "/Dining_Court?name=" +
              name.split(" ").join("_") +
              "&date=" +
              date +
              "&meal="
        } else {
          to =
              "/Dining_Court?name=" +
              name.split(" ").join("_") +
              "&date=" +
              date +
              "&meal=" +
              meal
        }
        this.state.html.push(
          <NavLink
            id={"pictureLink" + i}
            to={to}
          >
            <img
              id={"picture" + i}
              alt={name}
              src={url + "Picture?picturename=" + name.split(" ").join("_")}
              width={this.state.width * 0.5}
              height={this.state.width * 0.5 * 0.5625} //height={"200"} width={"200"}
            />
          </NavLink>
        );
        this.state.html.push(
          <Link
            style={{ fontSize: "28px" }}
            id={"link" + i}
            to={to}
          >
            <br></br>
            {name}
          </Link>
        );
      }
      this.setState({ loading: false });
      this.forceUpdate();
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="App">
          <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
            <header
              className="my-5 mx-5 bg-light border rounded justify-content-center"
              style={{ textAlignVertical: "center", textAlign: "center" }}
            >
              <h1
                key={"class"}
                className="App-title"
                style={{ textAlignVertical: "center", textAlign: "center" }}
              >
                <strong>Dining Courts</strong>
              </h1>
              <Container className="p-2">
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
              </Container>
            </header>
          </Container>
        </div>
      );
    }
    let i = 0;
    const listItems = this.state.html.map((d) => (
      <d.type
        key={"list" + i++}
        src={d.props.src}
        alt={d.props.name}
        to={d.props.to}
        id={d.key}
        style={d.props.style}
        color={d.props.color}
        height={d.props.height}
        width={d.props.height}
      >
        {d.props.children}
      </d.type>
    ));
    return (
      <div className="App">
        <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
          <header
            className="my-5 mx-5 bg-light border rounded justify-content-center"
            style={{ textAlignVertical: "center", textAlign: "center" }}
          >
            <h1
              key={"class"}
              className="App-title"
              style={{ textAlignVertical: "center", textAlign: "center" }}
            >
              <strong>Dining Courts</strong>
            </h1>
            {listItems}
          </header>
        </Container>
        <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
            <p>{this.state.onthego}</p>
        </Container>
      </div>
    );
  }
}
