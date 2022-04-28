/**
 * MealPlanProfileView.jsx
 * displays meal plan to be selected and used
 * by a user on their profile page
 *
 * @author Ashton Statz
 */

import {
    Container,
    Stack,
    Button,
    Form,
    Row,
    Col,
    Accordion,
} from 'react-bootstrap';
import { SchedulerMealDay } from '../Scheduler/';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { MealPlanSelector } from './';

function MealPlanProfileView(props) {
    const [currentState, setCurrentState] = useState('none');
    const [mealPlan, setMealPlan] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const username = props.store.getState().app.username;
    const editable = false;

    const DAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    useEffect(async () => {
        // filter private or not private rows
        try {
            const { data: response } = await axios.get(
                'http://localhost:3001/api/users/mealPlan/' + props.urlUsername
            );

            if (response !== undefined && response !== null) {
                if (response._id) {
                    const id = response._id;
                    const { data: response2 } = await axios.get(
                        'http://localhost:3001/api/meal-plans/' + id
                    );
                    setMealPlan(response2);
                    setCurrentState('display-meal');
                } else {
                    if (username === props.urlUsername) {
                        // on our own profile page
                        setCurrentState('none');
                    } else {
                        setCurrentState('none-not-owned');
                    }
                }
            }

            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleSelectMealPlan = () => {
        setCurrentState('select');
    };

    const handleFinishButton = () => {
        // delete the value stored for the meal plan of this user
    };

    const handleSelectedPlan = (plan) => {
        setMealPlan(plan);
        setCurrentState('display-meal');
    };

    return (
        <Container>
            {currentState === 'none' ? (
                <div className='p-5 text-center'>
                    <Stack gap={3}>
                        <h4>No Meal Plan Selected.</h4>
                        <Button onClick={handleSelectMealPlan}>
                            Select Meal Plan
                        </Button>
                    </Stack>
                </div>
            ) : currentState === 'none-not-owned' ? (
                <div className='p-5 text-center'>
                    <Stack gap={3}>
                        <h4>No Meal Plan Selected.</h4>
                    </Stack>
                </div>
            ) : currentState === 'select' ? (
                <MealPlanSelector
                    store={props.store}
                    returnSelectedMeal={handleSelectedPlan}
                />
            ) : (
                <Container>
                    <div className='p-3 my-4 mx-4 bg-white rounded'>
                        <h3>
                            <strong>{mealPlan.name}</strong>
                        </h3>
                        <Container className='pt-3'>
                            <Form>
                                <Form.Group
                                    as={Row}
                                    className='px-3 mb-3'
                                    controlId='formHorizontalEmail'
                                >
                                    <Col sm={6} className='mb-2'>
                                        <Form.Label>
                                            Meal Schedule Name:{' '}
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='My Healthy Meal Plan'
                                            value={mealPlan.name}
                                            onChange={null}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label>Owner:</Form.Label>
                                        <Form.Control
                                            disabled
                                            value={mealPlan.owner}
                                        />
                                    </Col>
                                    <Col sm={6} className='mb-2'>
                                        <Form.Label></Form.Label>
                                        <Form.Check
                                            type='switch'
                                            label={
                                                !mealPlan.private
                                                    ? 'Meal Plan is set to: PUBLIC'
                                                    : 'Meal Plan is set to: PRIVATE'
                                            }
                                            checked={mealPlan.private}
                                            onChange={null}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Container>
                                <Form.Label className='px-1'>
                                    Meals by day:
                                </Form.Label>
                                <Accordion>
                                    {!loading ? (
                                        DAYS.map((day, i) => {
                                            return (
                                                <SchedulerMealDay
                                                    key={day}
                                                    day={day}
                                                    id={day}
                                                    index={i}
                                                    submitDay={null}
                                                    editable={editable}
                                                    mealList={mealPlan.meals[i]}
                                                />
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Accordion>
                                <Row className='mt-3'>
                                    <Col md={9} sm={8} xs={7}></Col>
                                    <Col md={3} sm={4} xs={5}>
                                        <Button
                                            variant='primary'
                                            type='Button'
                                            className='btn-block'
                                            onClick={handleFinishButton}
                                        >
                                            Finish Meal Plan
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </div>
                </Container>
            )}
        </Container>
    );
}

export default MealPlanProfileView;
