/**
 * SchedulerMealIndividual.jsx
 * displays an individual meal, which is made up of multiple foods for scheduler
 *
 * @author Ashton Statz
 */

import { Container, Form, Button, Stack, Row, Col } from 'react-bootstrap';
import { SchedulerFoodIndividual } from './';
import { useState, useEffect, useReducer } from 'react';
import Select from 'react-select';
import axios from 'axios';

function SchedulerMealIndividual(props) {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [foodListLength, setFoodListLength] = useState(0);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [foodList, setFoodList] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(async () => {
        if (props.editable) {
            try {
                const { data: response } = await axios.get(
                    'http://localhost:3001/Dining_Courts'
                );
                setLocations(response);
            } catch (err) {
                console.error(err);
            }
        } else {
            if (props.mealData !== undefined) {
                // load data in from the parent component
                setFoodList(props.mealData.foods);
                setName(props.mealData.name);
                setLocation(props.mealData.location);
                setFoodListLength(props.mealData.foods.length);
                forceUpdate();
            }
        }
    }, []);

    function handleUpdateMealName(meal_name) {
        setName(meal_name);
        props.updateMealHandler(props.mealData.key, meal_name, '*');
    }

    function handleUpdateMealLocation(meal_location) {
        setLocation(meal_location);
        props.updateMealHandler(props.mealData.key, '*', meal_location);
    }

    function handleAddFood() {
        let newFoodList = props.addFoodHandler(
            props.mealData.key,
            foodListLength
        );
        setFoodList(newFoodList);
        setFoodListLength(foodListLength + 1);
    }

    function handleUpdateFood(food_key, food_name, food_qty) {
        let newFoodList = props.updateFoodHandler(
            props.mealData.key,
            food_key,
            food_name,
            food_qty
        );
        setFoodList(newFoodList);
        forceUpdate();
    }

    function handleRemoveFood(food_key) {
        let newFoodList = props.removeFoodHandler(props.mealData.key, food_key);
        setFoodList(newFoodList);
        setFoodListLength(foodListLength - 1);
    }

    function handleFinishMeal() {
        props.updateFinished(props.mealData.key, true);
    }

    function handleEditMeal() {
        props.updateFinished(props.mealData.key, false);
        props.setSubmitted(false);
    }

    function handleRemoveMeal() {
        let newMealData = props.removeMealHandler(props.mealData.key);
        if (newMealData[props.mealData.key] === undefined) {
            return;
        }
        setName(newMealData[props.mealData.key].name);
        setLocation(newMealData[props.mealData.key].location);
    }

    function AddFoodButton() {
        return (
            <Button
                variant='secondary'
                className='mx-2'
                onClick={handleAddFood}
            >
                <i className='bi bi-plus-lg'></i>
            </Button>
        );
    }

    function FinishButton() {
        return (
            <Button className='btn-block' onClick={handleFinishMeal}>
                Finish Meal
            </Button>
        );
    }

    function EditButton() {
        return (
            <Button className='btn-block' onClick={handleEditMeal}>
                Edit Meal
            </Button>
        );
    }

    function RemoveButton() {
        return (
            <Button
                variant='danger'
                className='btn-block'
                onClick={handleRemoveMeal}
            >
                Remove Meal
            </Button>
        );
    }

    return (
        <Container className='px-3 py-1'>
            <div className='p-4 border rounded'>
                {!props.finished && props.editable ? (
                    <Stack gap={2}>
                        <Row className='px-2'>
                            <Col>
                                <Form.Label>Meal Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={name}
                                    placeholder={
                                        props.mealData.key === 0
                                            ? 'Breakfast'
                                            : props.mealData.key === 1
                                            ? 'Lunch'
                                            : 'Dinner'
                                    }
                                    onChange={(e) => {
                                        handleUpdateMealName(e.target.value);
                                    }}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Location</Form.Label>
                                <Select
                                    options={Object.keys(locations).map(
                                        (key, i) => {
                                            return {
                                                value: locations[key]._id,
                                                label: locations[key].name,
                                            };
                                        }
                                    )}
                                    value={
                                        location === ''
                                            ? 'Select...'
                                            : { label: location }
                                    }
                                    onChange={(e) => {
                                        handleUpdateMealLocation(e.label);
                                    }}
                                ></Select>
                            </Col>
                        </Row>
                        <Form.Label className='px-2'>Food Items</Form.Label>

                        {foodListLength > 0 ? (
                            <>
                                <Row className='px-3'>
                                    <Col xs={2} s={2}>
                                        Qty
                                    </Col>
                                    <Col xs={8} s={9}>
                                        Food Item Name
                                    </Col>
                                </Row>
                                {props.mealData.foods.map((item, i) => (
                                    <SchedulerFoodIndividual
                                        key={item.key}
                                        id={item.key}
                                        removeFood={handleRemoveFood}
                                        addFood={handleAddFood}
                                        updateFood={handleUpdateFood}
                                        label={item.name}
                                        value={item.key}
                                        qty={item.food_qty}
                                        editable={props.editable}
                                        food={props.mealData.foods[i]}
                                    />
                                ))}
                            </>
                        ) : (
                            <div className='px-2'>No foods selected</div>
                        )}
                        {!props.editable ? (
                            <></>
                        ) : foodListLength === 0 ? (
                            <AddFoodButton />
                        ) : foodListLength < 5 ? (
                            <AddFoodButton />
                        ) : (
                            <></>
                        )}
                        <br />
                        {props.editable ? (
                            <Row className='px-2'>
                                <Col>
                                    <FinishButton />
                                </Col>
                                <Col>
                                    <RemoveButton />
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                    </Stack>
                ) : (
                    <Stack gap={2}>
                        <Row className='px-2'>
                            <Col>
                                <Form.Label>Meal Name</Form.Label>
                                <h5>{name === '' ? 'No name' : name}</h5>
                            </Col>
                            <Col>
                                <Form.Label>Location</Form.Label>
                                <h5>
                                    {location === '' ? 'No location' : location}
                                </h5>
                            </Col>
                        </Row>
                        <Form.Label className='px-2'>Food Items</Form.Label>
                        <div className='px-4 pb-3'>
                            {(foodListLength === 0 || foodListLength === undefined)
                                ? 'No food selected'
                                : foodList.map((food) => (
                                      <li key={food.key}>
                                          {food.name}, {food.food_qty}
                                      </li>
                                  ))}
                        </div>
                        <br />
                        {props.editable ? (
                            <Row className='px-2'>
                                <Col>
                                    <EditButton />
                                </Col>
                                <Col>
                                    <RemoveButton />
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                    </Stack>
                )}
            </div>
        </Container>
    );
}

export default SchedulerMealIndividual;
