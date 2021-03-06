import React from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

import { StarRating } from "../components/";
import { Stack, Row, Col, Container, Placeholder, Button, Modal, Form } from "react-bootstrap";
import { store, ClearForm, UpdateForm } from "../store/store";
import UserTags from "../components/UserTags";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const url = 'http://localhost:3001/';

var ress;
const axios = require("axios");

export default class Food extends React.Component {
  constructor() {
    super();
    this.state = {
      res: "",
      loading: true,
      html: [],
      adminhtml: [],
      loggedInhtml: [],
      data: [],
      isNotGuest: store.getState().app.isNotGuest,
      username: store.getState().app.username,
      showModal: false,
      newTagName: "",
      rating: 0,
      tried: false,
    };
    this.username = store.getState().app.username;
    this.getRatingFromAPI = this.getRatingFromAPI.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.state.queries = queryString.parse(window.location.search);
  }

  // get a user's rating for this individual food
  async getRatingFromAPI() {
    this.state.loading = true;

    axios
      .get(
        url +
          "api/getFoodRating?food=" +
          this.state.queries.name +
          "&user=" +
          this.username
      )
      .then((res) => {
        console.log(res);
        this.state.rating = res.data.rating;
      })
      .catch((err) => {
        console.log(err);
      });
    this.state.loading = false;
  }

  async updateRating(newRating) {
    const userdata = {
      ownerName: this.username,
      foodName: this.state.queries.name.replaceAll("_", " "),
      rating: newRating,
    };

    axios.post(url + "api/editFoodRating", { data: userdata }).then((res) => {
      console.log(res);
    });
  }

  componentDidMount() {
    this.callAPI();
    // if the user is logged in load rating
    if (this.username !== undefined) {
      this.getRatingFromAPI();
    }
  }

  async callAPI() {
    this.state.loading = true;
    let loggedIn = true;
    let admin = store.getState().app.isAdmin;

    try {
      var response = await axios.get(
        url + `food?name=` + this.state.queries.name
      );
    } catch (error) {
      console.log("error");
    } finally {
      console.log(response)
      if (response.data[0] == null) {
        this.state.html.push(
          <a>This food ({this.state.queries.name}) does not exist.</a>
        );
      } else {
        if (admin) {
          this.state.adminhtml.push(
            <div>
               <Link to={"edit_food?name=" + this.state.queries.name}>
                <Button type="button">Edit This Food</Button>
              </Link>
              <br></br> <br></br>
              
            </div>
             
          );
        }
        this.setState({ data: response.data[0] });
        if (
          this.state.data.dietaryTags == null ||
          this.state.data.dietaryTags === "undefined" ||
          this.state.data.dietaryTags === ""
        ) {
          this.state.data.dietaryTags = [];
        }
        if (
          this.state.data.diets == null ||
          this.state.data.diets === "undefined" ||
          this.state.data.diets === ""
        ) {
          this.state.data.diets = [];
        }
        if (
          this.state.data.groups == null ||
          this.state.data.groups === "undefined" ||
          this.state.data.groups === ""
        ) {
          this.state.data.groups = [];
        }
        this.state.html.push(<h1>{this.state.data.name}</h1>);
        this.state.html.push(<hr></hr>);

        if (
          this.state.username != null &&
          this.state.username !== "undefined" &&
          this.state.username !== ""
        ) {
          try {
            var response = await axios.get(
              url +
                `Tried?name=` +
                this.state.queries.name +
                "&username=" +
                this.state.username
            );
          } catch (error) {
            console.log("error");
          } finally {
            console.log(response.data);
            this.setState({ tried: response.data });
            console.log("tried = " + this.state.tried);
            if (response.data === false) {
              this.state.html.push(
                <h5>
                  You have not tried this food.<br></br>
                </h5>
              );
              this.state.html.push(
                <Link
                  to={
                    "Post_Tried?name=" +
                    this.state.queries.name +
                    "&changeFrom=" +
                    this.state.tried +
                    ""
                  }
                >
                  <Button type="button">I have tried this food</Button>
                </Link>
              );
            } else {
              this.state.html.push(
                <h5>
                  You have tried this food.<br></br>
                </h5>
              );
              this.state.html.push(
                <Link
                  to={
                    "Post_Tried?name=" +
                    this.state.queries.name +
                    "&changeFrom=" +
                    this.state.tried +
                    ""
                  }
                >
                  <Button type="button">I have not tried this food</Button>
                </Link>
              );
            }
            this.state.html.push(<hr></hr>);
          }
        }
        this.state.html.push(<h3>Nutrition Facts</h3>);
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <h5>Serving size: {this.state.data.servingSize}</h5>
        );
        this.state.html.push(<hr className="class-1"></hr>);
        this.state.html.push(
          <h5>
            Amount per serving<br></br>
          </h5>
        );
        this.state.html.push(
          <h3>
            Calories: {this.state.data.calories}
            <br></br>
          </h3>
        );
        this.state.html.push(<hr className="class-2"></hr>);
        this.state.html.push(
          <a>
            <strong>Total Fat:</strong> {this.state.data.totalFat}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            &emsp;&emsp;Saturated Fat: {this.state.data.saturatedFat}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            <strong>Cholesterol:</strong> {this.state.data.cholesterol}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            <strong>Sodium:</strong> {this.state.data.sodium}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            <strong>Total Carbohydrate:</strong>{" "}
            {this.state.data.totalCarbohydrate}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            &emsp;&emsp;Dietary Fiber: {this.state.data.dietaryFiber}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            &emsp;&emsp;Sugar: {this.state.data.sugar}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        console.log("addedSugar=" + this.state.data.addedSugar);
        if (
          this.state.data.addedSugar != null &&
          this.state.data.addedSugar !== "undefined" &&
          this.state.data.addedSugar !== ""
        ) {
          this.state.html.push(
            <a>
              &emsp;&emsp;&emsp;&emsp;Added Sugar: {this.state.data.addedSugar}
              <br></br>
            </a>
          );
          this.state.html.push(<hr></hr>);
        }
        this.state.html.push(
          <a>
            <strong>Protein:</strong> {this.state.data.protein}
            <br></br>
          </a>
        );
        this.state.html.push(<hr className="class-1"></hr>);
        this.state.html.push(
          <a>
            Calcium: {this.state.data.calcium}
            <br></br>
          </a>
        );
        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            Iron: {this.state.data.iron}
            <br></br>
          </a>
        );
        this.state.html.push(<hr className="class-2"></hr>);
        this.state.html.push(
          <a>
            Tags: {this.state.data.tags}
            <br></br>
          </a>
        );
        this.state.html.push(<hr className="class-1"></hr>);
        if (
          this.state.data.calcium != null &&
          this.state.data.calcium !== "undefined" &&
          this.state.data.calcium !== ""
        ) {
          this.state.html.push(
            <a>
              Calcium: {this.state.data.calcium}
              <br></br>
            </a>
          );
          if (
            this.state.data.iron != null &&
            this.state.data.iron !== "undefined" &&
            this.state.data.iron !== ""
          ) {
            this.state.html.push(<hr></hr>);
          } else {
            this.state.html.push(<hr className="class-2"></hr>);
          }
        }
        if (
          this.state.data.iron != null &&
          this.state.data.iron !== "undefined" &&
          this.state.data.iron !== ""
        ) {
          this.state.html.push(
            <a>
              Iron: {this.state.data.iron}
              <br></br>
            </a>
          );
          this.state.html.push(<hr className="class-2"></hr>);
        }
        this.state.html.push(
          <h5>
            Tags:<br></br>
          </h5>
        );

        if (
          this.state.data.dietaryTags == null ||
          this.state.data.dietaryTags === "undefined" ||
          this.state.data.dietaryTags.length === 0
        ) {
          this.state.html.push(
            <a>
              This food does not have any tags.<br></br>
            </a>
          );
        } else {
          for (let i = 0; i < this.state.data.dietaryTags.length; i++) {
            if (
              this.state.data.dietaryTags[i] == null ||
              this.state.data.dietaryTags[i] === "undefined" ||
              this.state.data.dietaryTags[i] === ""
            ) {
              this.state.html.push(
                <a>
                  This food does not have any tags.<br></br>
                </a>
              );
            } else {
              this.state.html.push(
                <a>
                  ??? {this.state.data.dietaryTags[i]}
                  <br></br>
                </a>
              );
            }
          }
        }
        this.state.html.push(<hr></hr>);

        this.state.html.push(
          <h5>
            Diet Groups:<br></br>
          </h5>
        );
        if (
          this.state.data.diets == null ||
          this.state.data.diets === "undefined" ||
          this.state.data.diets.length === 0
        ) {
          this.state.html.push(
            <a>
              This food does not have any diet groups.<br></br>
            </a>
          );
        } else {
          for (let i = 0; i < this.state.data.diets.length; i++) {
            if (
              this.state.data.diets[i] == null ||
              this.state.data.diets[i] === "undefined" ||
              this.state.data.diets[i] === ""
            ) {
              this.state.html.push(
                <a>
                  This food does not have any diet groups.<br></br>
                </a>
              );
            } else {
              this.state.html.push(
                <a>
                  ??? {this.state.data.diets[i]}
                  <br></br>
                </a>
              );
            }
          }
        }
        this.state.html.push(<hr></hr>);

        this.state.html.push(<h5>Food Groups:</h5>);
        if (
          this.state.data.groups == null ||
          this.state.data.groups === "undefined" ||
          this.state.data.groups.length === 0
        ) {
          this.state.html.push(
            <a>
              This food does not have any food groups.<br></br>
            </a>
          );
        } else {
          for (let i = 0; i < this.state.data.groups.length; i++) {
            if (
              this.state.data.groups[i] == null ||
              this.state.data.groups[i] === "undefined" ||
              this.state.data.groups[i] === ""
            ) {
              this.state.html.push(
                <a>
                  This food does not have any food groups.<br></br>
                </a>
              );
            } else {
              this.state.html.push(
                <a>
                  ??? {this.state.data.groups[i]}
                  <br></br>
                </a>
              );
            }
          }
        }

        this.state.html.push(<hr></hr>);
        this.state.html.push(
          <a>
            Cuisine: {this.state.data.cuisine}
            <br></br>
          </a>
        );
        this.state.html.push(<hr className="class-2"></hr>);
        this.state.html.push(<h5>Cuisine:</h5>);
        if (
          this.state.data.cuisine == null ||
          this.state.data.cuisine === undefined ||
          this.state.data.cuisine === ""
        ) {
          this.state.html.push(
            <a>
              This food does not have any cuisine defined.<br></br>
            </a>
          );
        } else {
          this.state.html.push(<a>{this.state.data.cuisine}</a>);
        }
        this.state.html.push(<hr className="class-2"></hr>);
        this.state.html.push(<a>Ingredients: {this.state.data.ingredients}</a>);
      }

      this.state.loading = false;
      this.forceUpdate();
    }
  }

  handleClose = (event) => {
    this.setState({
      showModal: false,
      message: ""
    });
  };

  handleOpen = (event) => {
    this.setState({
      showModal: true,
      message: ""
    });
  };

  handleChange = (event) => {
    event.preventDefault();
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.id;
    this.setState({
      [name]: value,
    });
    //console.log(this.state.newTagName);
  };

  handleSubmitTag = (event) => {
    if (this.state.isNotGuest) {
        event.preventDefault();
        var noErr = true;
        if (noErr && !/^([a-zA-Z \-]{3,})$/.test(this.state.newTagName)) {
          this.setState({ message: "Must be 3 characters long only letters" });
          noErr = false;
        }
        if (noErr && !/^([A-Z]{1,1}[a-z \-]{2,})$/.test(this.state.newTagName)) {
          this.setState({
            message:
              "Must start with a capital letter and have no other capital letters",
          });
          noErr = false;
        }
        var realFoodName = (this.state.queries.name).replace(/_/g, ' ');;
        const reqInfo = {
          headers: {
            "Content-Type": "application/json",
          },
          username: this.state.username,
          foodName: realFoodName,
          foodTagName: this.state.newTagName,
        };
        if (noErr) {
          //console.log(reqInfo);
          axios.post("http://localhost:3001/api/addUserTag", { data: reqInfo });
          this.state.showModal = false;
          window.location.reload();
        }
    }
    else {
      this.setState({
        message: "You must be logged in for this feature"
      });
    }
  };

  render() {
    if (this.state.queries.name == null) {
      return <Redirect to="/Foods" push />;
    }
    if (this.state.loading) {
      return (
        <div className="App">
        <Container style={{ padding: "20vh" }}>
          <div className="p-6 my-4 mx-4 bg-light border rounded ">
            <Placeholder animation="gglow" size="xl">
                <Placeholder xs={3} />
                <Placeholder xs={4} />
                <Placeholder xs={6} />
                <Placeholder xs={12} />
                <Placeholder xs={5} />
                <Placeholder xs={12} />
                <Placeholder xs={3} />
                <Placeholder xs={8} />
            </Placeholder>
          </div>
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
        className={d.props.class}
      >
        {d.props.children}
      </d.type>
    ));
    const adminItems = this.state.adminhtml.map((d) => (
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
        className={d.props.class}
      >
        {d.props.children}
      </d.type>
    ));
    const loggedInItems = this.state.loggedInhtml.map((d) => (
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
        className={d.props.class}
      >
        {d.props.children}
      </d.type>
    ));

    if (
      this.state.queries.message != null &&
      this.state.queries.message !== "undefined" &&
      this.state.queries.message !== ""
    ) {
      return (
        <div className="App">
          <Container style={{ paddingTop: "14vh", paddingBottom: "10vh" }}>
            <div>{adminItems}</div>
            <div className="p-6 my-4 mx-4 bg-light border rounded">
              <a>{this.state.queries.message}</a>
            </div>
            <div className="p-6 my-4 mx-4 bg-light border rounded">
              {listItems}
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Container style={{ paddingTop: "14vh", paddingBottom: "10vh" }}>
            <div>
              <Container style={{ paddingLeft: '2vh', paddingRight: '115vh'}}>
                  <Stack>
                      {adminItems}
                  </Stack>
              </Container>

            </div>
            <div className="pt-1 pb-2 p-3 my-4 mx-4 bg-light border rounded w-100">
                <UserTags />
                <Button className="mx-auto btn btn-secondary" hidden={this.state.isNotGuest !== true} onClick={this.handleOpen}>Add food tag</Button>
                <Button onClick={(x) => {
                console.log(x)
                console.log(this.state);
                axios.post("http://localhost:3001/api/user/add_favorite", 
                  
                  { 
                   data: {
                     user: this.state.username,
                     food: this.state.queries.name
                   }
                     
                  }
                );
                console.log('ntif')
                NotificationManager.success(`Added ${this.state.queries.name.replaceAll('_', " ")} to favorites`, 'Success', 3000);
                setTimeout(() => {
                  NotificationManager.info(`${this.state.queries.name.replaceAll('_', " ")} is available this week on the menu!`, 'Favorite Available', 3000);
                }, 1000)


              }}>Add to favorites</Button>
                {loggedInItems}
            </div>
            <NotificationContainer/>
            <Container style={{ paddingRight: '115vh'}}>
                <Stack>

                </Stack>
            </Container>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
              {listItems}
            </div>
            {
              this.username !== undefined ? (
                  <>
                  
                  <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Button className="mx-auto btn btn-secondary" hidden={this.state.isNotGuest !== true} onClick={this.handleOpen}>Add food tag</Button>
                    {' '}
                    <Button onClick={(x) => {
                    console.log(x)
                    console.log(this.state);
                    axios.post("http://localhost:3001/api/user/add_favorite", 
                        
                        { 
                        data: {
                            user: this.state.username,
                            food: this.state.queries.name
                        }
                            
                        }
                        );

                    }}>Add to favorites</Button>
                        {loggedInItems}
                </div>
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                  <h3>
                    Give {this.state.queries.name.replaceAll("_", " ")} a
                    rating!
                  </h3>
                  <StarRating
                    inputRating={this.state.rating}
                    updateFunction={this.updateRating}
                  />
                </div>
                </>
              ) : (
                <></>
              ) /* only display in the case that user is logged in */
            }
          </Container>
            <Form onSubmit={this.handleSubmitTag}>
                <Modal show={this.state.showModal} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add user tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><p className="user-tag-add-prompt">Add a user tag to {this.state.queries.name}?</p><p className="user-tag-add-prompt"> Proper format includes only lowercase
                                letters, spaces, and hyphens, except for the first character. The first character MUST be capital.</p>
                        <Form.Group className="mb-3 " style={{width: '16.5em'}} controlId='newTagName'>
                            <Form.Label>New Tag Name</Form.Label>
                            <Form.Control type="newTagName" value={this.state.newTagName} onChange={this.handleChange} />
                        </Form.Group>
                        {this.state.message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col><Button variant="primary" onClick={this.handleSubmitTag}>Add tag</Button></Col>
                            <Col><Button variant="secondary" onClick={this.handleClose}>Cancel</Button></Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
      );
    }
  }
}
