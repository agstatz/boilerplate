/**
 * MealPlanList.jsx
 *
 * A table that displays favorite foods
 *
 * @author Arjan Mobin
 */

import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { useEffect, useState } from "react";
import axios from "axios";

function FavoriteFoodList(props) {
  const [favoriteFoods, setFavoriteFoods] = useState([{}]);
  const [loading, setLoading] = useState(false);

  // this defines all of the rows in the table
  const columns = [
    {
      dataField: "_id",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Food Name",
      sort: true,
      formatter: foodNameFormatter,
      classes: "black-content",
      headerClasses: "black-content",
      sortCaret: getCaret,
    }
  ];

  useEffect(async () => {
    // filter private or not private rows
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/meal-plans"
      );
      setFavoriteFoods(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // formats the form name to be a link
  function foodNameFormatter(cell, row) {
    if (row.name) {
      console.log((row.name).replace(" ", "_"))
      return <Link to={`/food?name=${row.name}`}>{cell}</Link>;
    }
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
    {loading ? (<></>) : (
        <div className="p-2 my-2 mx-2">
          <BootstrapTable
            keyField="_id"
            data={favoriteFoods}
            columns={columns}
            bordered={false}
          />
        </div>
      )}
    </Container>
  );
}

export default FavoriteFoodList;
