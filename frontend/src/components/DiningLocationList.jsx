import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { useEffect, useState } from "react";
import axios from "axios";

function DiningLocationList(props: Props) {
  const [hiddenRowsArray, setHiddenRowsArray] = useState({});
  const [diningLocationArray, setDiningLocationArray] = useState([{}]);

  // this defines all of the rows in the table
  var columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: true,
      formatter: idFormatter,
      classes: "black-content",
      headerClasses: "black-content",
      sortCaret: getCaret,
    },
    {
      dataField: "name",
      text: "Location Name",
      sort: true,
      formatter: locationNameFormatter,
      classes: "black-content",
      headerClasses: "black-content",
      sortCaret: getCaret,
    },
    {
      dataField: "hidden",
      text: "Hidden",
      formatter: hiddenFormatter,
      classes: "black-content",
      headerClasses: "black-content",
    },
  ];

  useEffect(async () => {
    // filter private or not private rows
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/dining-locations"
      );
      console.log(response);
      setDiningLocationArray(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const filterRows = (filter) => {
      var hiddenLocationsArray = {};
      var newArrayLength = 0;
      if (filter === "invalid") {
        for (var i = 0; i < diningLocationArray.length; i++) {
          if (!diningLocationArray[i]._id) {
            hiddenLocationsArray[newArrayLength] = diningLocationArray[i]._id;
            newArrayLength++;
          }
        }
      } else if (filter) {
        // assume the user has passed a username
        for (var i = 0; i < diningLocationArray.length; i++) {
          if (diningLocationArray[i].owner !== filter) {
            hiddenLocationsArray[newArrayLength] = diningLocationArray[i]._id;
            newArrayLength++;
          }
        }
      }
      return hiddenLocationsArray;
    };
    setHiddenRowsArray(filterRows(props.filterValue));
  }, [diningLocationArray]);

  // formats the row private into checkboxes
  function hiddenFormatter(cell, row) {
    return <Form.Check checked={cell} readonly="true" />;
  }

  // formats the form name to be a link
  function locationNameFormatter(cell, row) {
    return <p>{cell}</p>;
  }

  function idFormatter(cell, row) {
    return <Link to={`/dining-courts/${row.name}`}>{row._id}</Link>;
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
    <Container>
      <div className="p-2 my-2 mx-2">
        <BootstrapTable
          keyField="_id"
          data={diningLocationArray}
          columns={columns}
          hiddenRows={hiddenRowsArray}
          bordered={false}
        />
      </div>
    </Container>
  );
}

export default DiningLocationList;
