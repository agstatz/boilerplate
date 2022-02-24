/**
 * MealPlanList.jsx
 * 
 * A table that displays meal plans as necessary
 * 
 * @author Ashton Statz
 */

 import { Container, Form } from "react-bootstrap";
 import { Link } from "react-router-dom";
 import BootstrapTable from "react-bootstrap-table-next";

 import { useEffect, useState } from 'react';

 function MealPlanList(props) {

    const [hiddenRowsArray, setHiddenRowsArray] = useState({});

    // this defines all of the rows in the table
    var columns = [{
        dataField: 'id',
        text: "Plan ID",
        sort: true,
        classes: 'black-content',
        headerClasses: 'black-content',
        sortCaret: getCaret
    }, {
        dataField: 'name',
        text: "Plan Name",
        sort: true,
        formatter: planNameFormatter,
        classes: 'black-content',
        headerClasses: 'black-content',
        sortCaret: getCaret
    }, {
        dataField: 'private',
        text: "Private",
        formatter: privateFormatter,
        classes: 'black-content',
        headerClasses: 'black-content',
    }, {
        dataField: 'owner',
        text: "Owner",
        sort: true,
        classes: 'black-content',
        headerClasses: 'black-content',
        sortCaret: getCaret
    }, {
        dataField: 'likes',
        text: "Likes",
        classes: 'black-content',
        headerClasses: 'black-content',
        sort: true,
        sortCaret: getCaret
    },];

    // TODO: dynamically get this info
    // from the database
    var mealPlanArray = [{
        id: 1,
        name: "Salads Every Day",
        private: true,
        owner: "agstatz",
        likes: 0
    }, {
        id: 2,
        name: "Meat Mania",
        private: false,
        owner: "agstatz",
        likes: 4
    },
    {
        id: 3,
        name: "Pizza tour",
        private: true,
        owner: "agstatz",
        likes: 0
    },
    {
        id: 4,
        name: "Cookies",
        private: true,
        owner: "arjan00",
        likes: 0
    }, {
        id: 5,
        name: "Ford and Wiley",
        private: false,
        owner: "jefe93",
        likes: 5
    },];

    useEffect(() => {
        // filter private or not private rows
        const filterRows = (filter) => {
            var hiddenMealsArray = {};
            var newArrayLength = 0;
            if (filter === "private") {
                for (var i = 0; i < mealPlanArray.length; i++) {
                    if (mealPlanArray[i].private) {
                        hiddenMealsArray[newArrayLength] = mealPlanArray[i].id;
                        newArrayLength++;
                    }
                }
            } else if (filter) {
                // assume the user has passed a username
                for (var i = 0; i < mealPlanArray.length; i++) {
                    if (mealPlanArray[i].owner !== filter) {
                        hiddenMealsArray[newArrayLength] = mealPlanArray[i].id;
                        newArrayLength++;
                    }
                }
            }
            return hiddenMealsArray;
        }
        setHiddenRowsArray(filterRows(props.filterValue));
    }, [])

    // formats the row private into checkboxes
    function privateFormatter(cell, row) {
        return (
            <Form.Check checked={ cell } readOnly/>
        );
    }

    // formats the form name to be a link
    function planNameFormatter(cell, row) {
        return (
            <Link to={`/meal-plans/${row.id}`}>{cell}</Link>
        );
    }
    
    // Returns caret that points in direction of 
    // desc/asc for sorting columns
    function getCaret(direction) {
        if (direction === 'asc') {
          return (
            <i className="bi bi-caret-up-fill"></i>
          );
        }
        if (direction === 'desc') {
          return (
            <i className="bi bi-caret-down-fill"></i>
          );
        }
        return (
            <i className="bi bi-caret-down-fill"></i>
        );
    }

    return (
            <Container>
                <div className="p-2 my-2 mx-2">
                    <BootstrapTable keyField="id" 
                                    data={mealPlanArray} 
                                    columns={columns}
                                    hiddenRows={hiddenRowsArray}
                                    bordered={ false }/>
                </div>
            </Container>
    );
 }

 export default MealPlanList;