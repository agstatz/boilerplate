/**
 * FoodRatingList.jsx
 *
 * returns a table of the most popular foods
 *
 * @author Ashton Statz
 */

import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';

function FoodRatingList() {
    const url = 'http://localhost:3001/';
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    var columns = [
        {
            dataField: '_id',
            hidden: true,
        },
        {
            dataField: 'name',
            text: 'Food Name',
            sort: true,
            classes: 'black-content',
            headerClasses: 'black-content',
            sortCaret: getCaret,
            formatter: foodFormatter,
        },
        {
            dataField: 'aggregateRating',
            text: 'Average Rating',
            classes: 'black-content',
            headerClasses: 'black-content',
            sort: true,
            sortCaret: getCaret,
        },
    ];

    const defaultSorted = [
        {
            dataField: 'aggregateRating',
            order: 'desc',
        },
    ];

    function getCaret(direction) {
        if (direction === 'asc') {
            return <i className='bi bi-caret-up-fill'></i>;
        }
        if (direction === 'desc') {
            return <i className='bi bi-caret-down-fill'></i>;
        }
        return <i className='bi bi-caret-down-fill'></i>;
    }

    function foodFormatter(cell, row) {
        return (
            <span>
                <Link to={`food?name=${row.name.split(' ').join('_')}`}>
                    {row.name}
                </Link>
            </span>
        );
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

    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        try {
            axios.get(url + 'Foods_Rating_Data').then((res) => {
                var foods_response = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i][2] !== null) {
                        foods_response.push({
                            _id: res.data[i][0],
                            name: res.data[i][1],
                            aggregateRating: res.data[i][2],
                        });
                    }
                }
                setFoods(foods_response);
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            {loading ? (
                <></>
            ) : (
                <div className='p-2 my-2 mx-2'>
                    <BootstrapTable
                        keyField='_id'
                        data={foods}
                        columns={columns}
                        defaultSorted={defaultSorted}
                        bordered={false}
                        pagination={paginationFactory(options)}
                    />
                </div>
            )}
        </Container>
    );
}

export default FoodRatingList;
