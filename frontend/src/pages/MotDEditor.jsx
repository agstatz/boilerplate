/**
 * MotDEditor.jsx
 *
 * This form allows admins to edit and hide/unhide the message of the day (MotD).
 *
 * @author Dawson Smith
 */

 import React from "react";
 import axios from "axios";
 import { Stack, Button, Container, Form } from "react-bootstrap";
 import { withRouter } from "react-router-dom";
 import queryString from "query-string";
 import UnauthorizedAccess from "../components/UnauthorizedAccess";
 
 // redux imports
 import { store } from "../store/store.js";
 import { useParams, useHistory } from "react-router-dom";
 
 const url = "http://localhost:3001/";
 
 class MotDEditor extends React.Component {
   constructor(props) {
     super();
 
     this.state = {
       loading: true,
       message: "",
       messageContents: "",
       hidden: false,
       isAdmin: store.getState().app.isAdmin,
     };
     this.callAPI = this.callAPI.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleCheck = this.handleCheck.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }


    componentDidMount() {
        if (this.state.isAdmin === true) {
            this.callAPI();
        }
    }

    async callAPI() {
        this.setState({ loading: true });
        let response;
        try {
            response = await axios.get("http://localhost:3001/api/motd/main");
        } catch (error) {
            console.log("error");
        } finally {
        this.setState({
            loading: false,
            messageContents: response.data.contents,
            hidden: response.data.isHidden
        });
        console.log(response);
        this.forceUpdate();
        }
    }
 
   handleChange = (event) => {
     let target = event.target;
     let value = target.type === "checkbox" ? target.checked : target.value;
     let name = target.id;
 
     this.setState({
       [name]: value,
     });
   };
 
   handleCheck = (event) => {
     this.setState({
       hidden: event.target.checked,
     });
   };
 
   // handles submitting the form
   handleSubmit = (event) => {
     // prevent page from reloading
     event.preventDefault();
 
     const messageInfo = {
       headers: {
         "Content-Type": "application/json",
       },
       contents: this.state.messageContents,
       isHidden: this.state.hidden,
     };
     this.setState({ message: "" });
     axios.put("http://localhost:3001/api/motd/main", {
            data: messageInfo,
            })
            .then((res) => {
                console.log(res);
                this.setState({ message: "MotD updated successfully" });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ message: "Error encountered during update" });
            });
   };
 
   render() {
     if (this.state.isAdmin === true) {
       return (
         <Container
           className="d-flex justify-content-center"
           style={{
             paddingTop: "10vh",
             paddingBottom: "2vh",
             paddingLeft: "55vh",
             paddingRight: "55vh",
           }}
         >
           <div className="p-5 my-4 mx-3  d-flex justify-content-center bg-light border rounded">
             <Stack>
               <Container className="d-flex justify-content-center">
                 <h3>Edit MotD</h3>
               </Container>
               <Form
                 className="registerFormFields"
                 onSubmit={this.handleSubmit}
                 align="center"
               >
                 <Form.Group
                   className="mb-3 "
                   style={{ width: "16.5em" }}
                   controlId="messageContents"
                 >
                   <Form.Label>Message</Form.Label>
                   <Form.Control
                     type="messageContents"
                     value={this.state.messageContents}
                     as="textarea"
                     onChange={this.handleChange}
                   />
                 </Form.Group>
                 <Form.Group
                   className="mb-1"
                   align="left"
                   style={{ width: "16.5em" }}
                   controlId="hidden"
                 >
                   <Form.Check
                     type="switch"
                     id="hidden"
                     label="Hide message"
                     checked={this.state.hidden}
                     onChange={this.handleCheck}
                   />
                 </Form.Group>
                 <Stack spacing={4}>
                   <p align="center">{this.state.message}</p>
                   <Button
                     className="mb-2 mt-1 btn btn-primary btn-sm"
                     onClick={this.handleSubmit}
                     type="submit"
                   >
                     Update MotD
                   </Button>
                   <a href="/admin-panel/" align="center">
                     Return to admin panel
                   </a>
                 </Stack>
               </Form>
             </Stack>
           </div>
         </Container>
       );
     } else {
       return <UnauthorizedAccess />;
     }
   }
 }
 
 export default MotDEditor;
 