/**
 * SchedulerMealDay.jsx
 * Displays a list of meals for a given day
 * for the meal scheduler
 *
 * @author Ashton Statz
 */

import { Stack, Button, Accordion, Badge } from 'react-bootstrap';
import { useState, useEffect, useReducer } from 'react';
import { SchedulerMealIndividual } from '.';

function SchedulerMealDay(props) {
    const [mealList, setMealList] = useState([]);
    const [finishedArr, setFinishedArr] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [mealListLength, setMealListLength] = useState(0);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(async () => {
        if (!props.editable) {
            //load and populate all values as this is not an
            //editable meal schedule
            if (props.mealList !== undefined) {
                setMealList(props.mealList);
                setMealListLength(props.mealList.length);
            }
        }
    }, []);

    function handleUpdateMeal(key, meal_name, meal_location) {
        let list = mealList;

        if (meal_name === '*') {
            list[key] = {
                key: key,
                name: list[key].name,
                location: meal_location,
                foods: list[key].foods,
            };
        } else if (meal_location === '*') {
            list[key] = {
                key: key,
                name: meal_name,
                location: list[key].location,
                foods: list[key].foods,
            };
        } else {
            list[key] = {
                key: key,
                name: meal_name,
                location: meal_location,
                foods: list[key].foods,
            };
        }
        setMealList(list);
    }

    function handleUpdateFinished(index, finishedValue) {
        let finishedList = finishedArr;
        finishedList[index] = finishedValue;
        setFinishedArr(finishedList);
        forceUpdate();
    }

    function handleAddMeal() {
        setMealListLength(mealListLength + 1);
        let list = mealList;
        list.push({
            key: mealListLength,
            name: '',
            location: '',
            foods: [],
        });

        let finishedList = finishedArr;
        finishedList.push(false);
        setSubmitted(false);
        setFinishedArr(finishedList);
        setMealList(list);
    }

    function handleRemoveMeal(key) {
        let list = mealList;
        list.splice(key, 1);

        for (let i = 0; i < list.length; i++) {
            list[i] = { ...list[i], key: i };
        }
        setMealList(list);
        setMealListLength(mealListLength - 1);

        let finishedList = finishedArr;
        finishedList.splice(key, 1);
        setFinishedArr(finishedList);
        setSubmitted(false);

        forceUpdate();
        return list;
    }

    // Adding a food to a meal's list
    function handleAddFoodToList(meal_key, food_key) {
        let list = mealList;
        list[meal_key].foods.push({
            key: food_key,
            name: '',
            food_qty: 1,
        });
        setMealList(list);
        return list[meal_key].foods;
    }

    // Updating a food of a meal's list
    function handleUpdateFood(meal_key, food_key, food_name, food_qty) {
        let list = mealList;
        if (food_qty === '*') {
            list[meal_key].foods[food_key] = {
                key: food_key,
                name: food_name,
                food_qty: list[meal_key].foods[food_key].food_qty,
            };
        } else if (food_name === '*') {
            list[meal_key].foods[food_key] = {
                key: food_key,
                name: list[meal_key].foods[food_key].name,
                food_qty: food_qty,
            };
        } else {
            list[meal_key].foods[food_key] = {
                key: food_key,
                name: food_name,
                food_qty: food_qty,
            };
        }

        setMealList(list);
        return list[meal_key].foods;
    }

    // Removing a food from a meal's list
    function handleRemoveFoodFromList(meal_key, food_key) {
        let list = mealList;
        list[meal_key].foods.splice(food_key, 1);
        for (let i = 0; i < list[meal_key].foods.length; i++) {
            list[meal_key].foods[i] = {
                key: i,
                name: list[meal_key].foods[i].name,
            };
        }
        setMealList(list);
        return list[meal_key].foods;
    }

    function handleSubmitDay() {
        props.submitDay(mealList, props.day);
        for (var i = 0; i < mealListLength; i++) {
            handleUpdateFinished(i, true);
        }
        setSubmitted(true);
    }

    // Button to add a meal to list of meals
    function AddMealButton() {
        return (
            <Button variant='secondary' onClick={handleAddMeal}>
                Add a Meal
            </Button>
        );
    }

    function SubmitDayButton() {
        return (
            <Button onClick={handleSubmitDay}>
                {submitted ? 'Resubmit' : 'Submit'} Meals for {props.day}
            </Button>
        );
    }

    return (
        <Accordion.Item eventKey={props.index} id={props.id}>
            <Accordion.Header>
                <h5>
                    Meals for {props.day}{' '}
                    {!props.editable ? (
                        <></>
                    ) : submitted ? (
                        <Badge pill>
                            Submitted {mealListLength}{' '}
                            {mealListLength === 1 ? 'meal' : 'meals'}
                        </Badge>
                    ) : (
                        <Badge bg='secondary' pill>
                            Meals not saved
                        </Badge>
                    )}
                </h5>
            </Accordion.Header>
            <Accordion.Body>
                <Stack gap={4}>
                    {mealList.map((item, i) => (
                        <SchedulerMealIndividual
                            key={item.key}
                            mealData={item}
                            addFoodHandler={handleAddFoodToList}
                            removeFoodHandler={handleRemoveFoodFromList}
                            updateFoodHandler={handleUpdateFood}
                            updateMealHandler={handleUpdateMeal}
                            removeMealHandler={handleRemoveMeal}
                            setSubmitted={setSubmitted}
                            updateFinished={handleUpdateFinished}
                            finished={finishedArr[i]}
                            editable={props.editable}
                        />
                    ))}
                    {mealListLength === 0 ? (
                        <>
                            <h4 className='text-center'>No meals scheduled.</h4>
                            {!props.editable ? <></> : <AddMealButton />}
                        </>
                    ) : mealListLength < 3 ? (
                        <>
                            {!props.editable ? (
                                <></>
                            ) : (
                                <>
                                    <AddMealButton />
                                    <SubmitDayButton />
                                </>
                            )}
                        </>
                    ) : (
                        <>{!props.editable ? <></> : <SubmitDayButton />}</>
                    )}
                </Stack>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default SchedulerMealDay;
