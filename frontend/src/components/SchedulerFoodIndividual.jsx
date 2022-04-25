/**
 * SchedulerFoodIndividual.jsx
 * displays an individual food for scheduler
 *
 * @author Ashton Statz
 */

import { CloseButton, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SchedulerFoodIndividual(props) {
    const [foods, setFoods] = useState([{}]);
    const [selectedFood, setSelectedFood] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(async () => {
        if (props.editable) {
            try {
                const { data: response } = await axios.get(
                    'http://localhost:3001/api/foods'
                );
                setFoods(response);
                setSelectedFood({
                    label: props.label,
                    value: props.value,
                });
                setQuantity(props.qty);
            } catch (err) {
                console.error(err);
            }
        } else {
            setSelectedFood({ label: props.food });
            setQuantity(props.quantity);
        }
    }, []);

    function updateFood(label, value) {
        setSelectedFood({ label, value });
        props.updateFood(props.id, label, quantity);
    }

    function updateFoodQty(qty) {
        setQuantity(qty);
        props.updateFood(props.id, selectedFood.label, qty);
    }

    function removeFood() {
        props.removeFood(props.id);
    }

    return (
        <Row className='mx-2 py-3 border rounded bg-light'>
            <Col xs={2} s={2}>
                <Form.Control
                    value={quantity}
                    onChange={(e) => {
                        updateFoodQty(e.target.value);
                    }}
                />
            </Col>
            <Col xs={8} s={9}>
                <Select
                    value={{
                        value: props.value,
                        label: props.label === '' ? 'Select...' : props.label,
                    }}
                    options={Object.keys(foods).map((key, i) => {
                        return {
                            value: foods[key]._id,
                            label: foods[key].name,
                        };
                    })}
                    onChange={(e) => {
                        updateFood(e.label, e.value);
                    }}
                />
            </Col>
            <Col xs={2} s={1} className='px-2'>
                <CloseButton onClick={removeFood} />
            </Col>
        </Row>
    );
}

export default SchedulerFoodIndividual;
