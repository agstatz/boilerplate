import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

// Import comments
import Comments from "../components/Comments/Comments";
import {store} from "../store/store";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
    }}
  />
);

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

const axios = require("axios");
const queryString = require("query-string");
const url = "http://localhost:3001/";

export default class Dining_Court extends React.Component {
  constructor() {
    super();
    this.state = {
      res: "",
      username: store.getState().app.username,
      html: [],
      html2: [],
      loading: true,
      queries: [],
      error: false,
    };
    this.callAPI = this.callAPI.bind(this);
    this.state.queries = queryString.parse(window.location.search);
    if (this.state.queries.date == null) {
      this.state.queries.date = getToday();
    }

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

  submitButton = (event) => {
    let string =
        "/Post_Eating_At?location=" +
        this.state.queries.name +
        "&date=" +
        this.state.queries.date +
        "&meal=" +
        this.state.queries.meal
    this.state.html.push(<Redirect to={string} />);
    this.forceUpdate();
  };

  async callAPI() {
    this.state.loading = true;
    let response;
    try {
      response = await axios.get(
        url +
          `Dining_Court?name=` +
          this.state.queries.name +
          "&date=" +
          this.state.queries.date +
          "&meal=" +
          this.state.queries.meal
      );
    } catch (error) {
      console.log("error")
      console.log(error);
      this.setState({ error: true });
    } finally {
      console.log(response);
      console.log(this.state.error);
      if (this.state.error) {
        this.state.html.push(<h1>Error: Dining Court not found</h1>);
      } else {
        this.state.html.push(<h1 className={"text-center"}>{this.state.queries.name.split("_").join(" ")}</h1>)
        if (response.data.length !== 0) {
          console.log(response.data)
          let list = response.data.stations;
          let k = 0;
          for (let i = 0; i < list.length; i++) {
            let toPush = <header className="w-50 p-3 my-4 mx-4 bg-light border rounded"></header>;
            let clonedToPush = React.cloneElement(toPush, { children: [] });
            clonedToPush.props.children.push(<h3 className={"text-center"}>{response.data.stations[i].name}</h3>)
            for (let j = 1; j < list[i].foods.length; j++) {
              clonedToPush.props.children.push(
                  <Link id={"food" + k++} to={"/food?name=" + list[i].foods[j]}>
                    {list[i].foods[j]}
                    <br></br>
                  </Link>
              );
            }
            this.state.html.push(clonedToPush)
          }
        } else {
          this.state.html.push(<h2><br></br>Dining schedule is not available for {this.state.queries.meal} on {this.state.queries.date}</h2>)
        }
        console.log(this.state.username)
        if (
            this.state.username != null &
            this.state.username !== "undefined" &&
            this.state.username !== ""
        ) {
          try {
            response = await axios.get(
                url +
                `Eating_At?username=` +
                this.state.username
            );
          } catch (error) {
            console.log(error)
          } finally {
            console.log("eatingat = " + response.data)
            if (response.data === this.state.queries.name.split("_").join(" ")) {
              this.state.html2.push(<Button onClick={this.submitButton} className="float-end btn-sm">I am no longer eating here</Button>)
            } else {
              this.state.html2.push(<Button onClick={this.submitButton} className="float-end btn-sm">I am eating here</Button>)
            }
          }
        }
      }
      this.state.loading = false;
      this.forceUpdate();
    }
  }

  render() {
    if (this.state.queries.name == null) {
      return <Redirect to="/dining_courts" push />;
    }

    if (this.state.loading) {
      return (
        <div className="App">
          <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
            <header className="p-3 my-4 mx-4 bg-light border rounded"></header>
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
        onClick={d.props.onClick}
        className={d.props.className}
      >
        {d.props.children}
      </d.type>
    ));
    const listItems2 = this.state.html2.map((d) => (
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
            onClick={d.props.onClick}
            className={d.props.className}
        >
          {d.props.children}
        </d.type>
    ));
    const buttonText = "ab"
    return (
      <div className="App">
        <Container style={{ paddingTop: "18vh", paddingBottom: "18vh" }}>
          <header className="p-3 my-4 mx-4 bg-light border rounded">
            {listItems2}
            <br></br>
            {listItems}
          </header>
        </Container>
        <Comments userID="1" />
      </div>
    );
  }
}
