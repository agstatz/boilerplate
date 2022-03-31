import { Container, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { useEffect, useState } from 'react';
import axios from "axios";

function UserTagsList(props: Props) {
    const targetFood = useLocation().search.substring(useLocation().search.lastIndexOf("=") + 1)
    const [hiddenRowsArray, setHiddenRowsArray] = useState({});
    const [foodTagArray, setFoodTagArray] = useState([{}]);

    useEffect( async() => {
        try {
            const {data:response} = await axios.get(("http://localhost:3001/api/foods/getuserfoodtags/".concat(targetFood)));
            setFoodTagArray(response);
        } catch (err) {
            console.error(err);
        }
    }, [])

    return (
            <Container>
                <div class="ovr row flex-col flex-nowrap pb-1">
                    {foodTagArray.map((foodTagArray, k) => (
                        <div class="col flex-start">
                                <div class="tag-block flex-start p-3">
                                    <h3>{foodTagArray.name}</h3>
                                    <p>score: {foodTagArray.rating}</p>
                                </div>
                        </div>
                    ))}
                </div>
            </Container>
    );
 }

export default UserTagsList;