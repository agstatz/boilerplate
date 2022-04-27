/**
 * MealPlanList.jsx
 *
 * A table that displays meal plans as necessary
 *
 * @author Ashton Statz
 */

import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MealPlanList(props) {
    const [hiddenRowsArray, setHiddenRowsArray] = useState({});
    const [mealPlanArray, setMealPlanArray] = useState([{}]);
    const [loading, setLoading] = useState(false);

    // this defines all of the rows in the table
    var columns = [
        {
            dataField: '_id',
            hidden: true,
        },
        {
            dataField: 'name',
            text: 'Plan Name',
            sort: true,
            formatter: planNameFormatter,
            classes: 'black-content',
            headerClasses: 'black-content',
            sortCaret: getCaret,
        },
        {
            dataField: 'private',
            text: 'Private',
            formatter: privateFormatter,
            classes: 'black-content',
            headerClasses: 'black-content',
        },
        {
            dataField: 'owner',
            text: 'Owner',
            sort: true,
            classes: 'black-content',
            headerClasses: 'black-content',
            sortCaret: getCaret,
        },
        {
            dataField: 'likes',
            text: 'Likes',
            classes: 'black-content',
            headerClasses: 'black-content',
            sort: true,
            sortCaret: getCaret,
        },
    ];

    const defaultSorted = [
        {
            dataField: 'likes',
            order: 'desc',
        },
    ];

    useEffect(async () => {
        // filter private or not private rows
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                'http://localhost:3001/api/meal-plans'
            );
            setMealPlanArray(response);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        const filterRows = (filter) => {
            var hiddenMealsArray = {};
            var newArrayLength = 0;
            if (filter === 'private') {
                for (var i = 0; i < mealPlanArray.length; i++) {
                    if (mealPlanArray[i].private) {
                        hiddenMealsArray[newArrayLength] = mealPlanArray[i]._id;
                        newArrayLength++;
                    }
                }
            } else if (filter) {
                // assume the user has passed a username
                for (var i = 0; i < mealPlanArray.length; i++) {
                    if (mealPlanArray[i].owner !== filter) {
                        hiddenMealsArray[newArrayLength] = mealPlanArray[i]._id;
                        newArrayLength++;
                    }
                }
            }
            return hiddenMealsArray;
        };
        setHiddenRowsArray(filterRows(props.filterValue));
    }, [mealPlanArray]);

    // formats the row private into checkboxes
    function privateFormatter(cell, row) {
        return <Form.Check checked={cell} readonly />;
    }

    // formats the form name to be a link
    function planNameFormatter(cell, row) {
        return <Link to={`/meal-plans/${row._id}`}>{cell}</Link>;
    }

    // Returns caret that points in direction of
    // desc/asc for sorting columns
    function getCaret(direction) {
        if (direction === 'asc') {
            return <i className='bi bi-caret-up-fill'></i>;
        }
        if (direction === 'desc') {
            return <i className='bi bi-caret-down-fill'></i>;
        }
        return <i className='bi bi-caret-down-fill'></i>;
    }

    const sizePerPageRenderer = ({
        options,
        currSizePerPage,
        onSizePerPageChange,
    }) => (
        <div className='btn-group' role='group'>
            {options.map((option) => {
                const isSelect = currSizePerPage === `${option.page}`;
                return (
                    <button
                        key={option.text}
                        type='button'
                        onClick={() => onSizePerPageChange(option.page)}
                        className={`btn ${
                            isSelect ? 'btn-primary' : 'btn-secondary'
                        }`}
                    >
                        {option.text}
                    </button>
                );
            })}
        </div>
    );

    const options = {
        sizePerPageRenderer,
    };

    return (
        <Container>
            {loading ? (
                <></>
            ) : (
                <div className='p-2 my-2 mx-2'>
                    <BootstrapTable
                        keyField='_id'
                        data={mealPlanArray}
                        columns={columns}
                        defaultSorted={
                            props.defaultSorted === 'likes'
                                ? defaultSorted
                                : null
                        }
                        hiddenRows={hiddenRowsArray}
                        bordered={false}
                        pagination={paginationFactory(options)}
                    />
                </div>
            )}
        </Container>
    );
}

export default MealPlanList;
