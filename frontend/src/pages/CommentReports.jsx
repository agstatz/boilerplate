/**
 * CommentReports.jsx
 *
 * A table that displays reported comments
 *
 * @author Arjan Mobin
 */

import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { useEffect, useState } from "react";
import axios from "axios";

function CommentReports(props) {
  const [commentReports, setCommentReports] = useState([{}]);
  const [loading, setLoading] = useState(false);

  // this defines all of the rows in the table
  const columns = [
    {
      dataField: "_id",
      hidden: true,
    },
    {
      dataField: "commentID",
      text: "Comment ID",
      sort: true,
      classes: "black-content",
      headerClasses: "black-content",
      sortCaret: getCaret,
    },
    {
        dataField: "text",
        text: "Content",
        sort: true,
        classes: "black-content",
        headerClasses: "black-content",
        sortCaret: getCaret,
      },
    {
        dataField: "reportedAt",
        text: "Report Time",
        sort: true,
        classes: "black-content",
        headerClasses: "black-content",
        sortCaret: getCaret,
      },
      {
        dataField: "reportedBy",
        text: "Reported",
        sort: true,
        classes: "black-content",
        headerClasses: "black-content",
        sortCaret: getCaret,
      },
      {
        dataField: "author",
        text: "Author",
        sort: true,
        classes: "black-content",
        headerClasses: "black-content",
        sortCaret: getCaret,
      },
      {
        dataField: "allow",
        text: "Allow",
        sort: true,
        classes: "black-content",
        headerClasses: "black-content",
        sortCaret: getCaret,
      },
      {
        dataField: "deny",
        text: "Remove",
        sort: true,
        classes: "black-content",
        headerClasses: "black-content",
        sortCaret: getCaret,
      },
      
  ];

  useEffect(async () => {
    // filter private or not private rows
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/getcommentreports"
      );
      console.log(response);
      for (let r of response) {
          r.allow = <Button variant="success" onClick={() => allowComment(r)}>Allow</Button>
          r.deny = <Button variant="danger" onClick={() => denyComment(r)}>Deny</Button>
      }
      setCommentReports(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  function denyComment(comment) {
    //remove from comments db and reported comments db
  }

  function allowComment(comment) {
      //remove from reported comments db
      console.log('allowing comment');
      console.log(comment);
      axios.post("http://localhost:3001/api/allowcomment", {data: comment})

  }

  // Returns caret that points in direction of
  // desc/asc for sorting columns
  function getCaret(direction) {
    if (direction === "asc") {
      return <i className="bi bi-caret-up-fill"></i>;
    }
    if (direction === "desc") {
      return <i className="bi bi-caret-down-fill"></i>;
    }
    return <i className="bi bi-caret-down-fill"></i>;
  }

  return (
    <Container style={{ paddingTop: "15vh", paddingBottom: "30vh" }}>
      <div className="p-3 my-4 mx-4 bg-light border rounded">
        <h1>
          <strong>Reported Comments</strong>
        </h1>
        <Container>
          {loading ? (
            <></>
          ) : (
            <div className="p-2 my-2 mx-2">
              <BootstrapTable
                keyField="_id"
                data={commentReports}
                columns={columns}
                bordered={false}
              />
            </div>
          )}
        </Container>{" "}
      </div>
    </Container>
  );
}

export default CommentReports;
