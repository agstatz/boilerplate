/**
 *  Scheduler.tsx
 *  The scheduler for scheduling meal plans
 *  over the course of a week
 *
 * @author Arjan Mobin, Ashton Statz
 */

import { Container, Button, Row, Col, Form, Accordion } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { store } from '../store/store.js';
import { SchedulerMealDay } from '../components';
import GuestUserRedirect from '../components/GuestUserRedirect';

function Scheduler() {
    const [mealPlan, setMealPlan] = useState([]);
    const [success, setSuccess] = useState(false);

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
        try {
            setMealPlan({
                owner: store.getState().app.username,
                likes: 0,
                private: false,
                name: 'My Meal Plan',
                schedule: [],
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    function submitDay(meals, day) {
        let index = DAYS.indexOf(day);
        let currentMealPlan = mealPlan.schedule;
        if (currentMealPlan.length === 0) {
            for (var i = 0; i < DAYS.length; i++) {
                currentMealPlan.push([]);
            }
        }
        currentMealPlan[index] = meals;
        updateSchedule(currentMealPlan);
    }

    function updateSchedule(mealslist) {
        let currentMealPlan = mealPlan;
        currentMealPlan.schedule = mealslist;
        setMealPlan(currentMealPlan);
    }

    // submits the meal plan
    function submit_plan() {
        axios
            .post('http://localhost:3001/api/meal-plans', mealPlan)
            .then((res) => {
                setSuccess(true);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    if (store.getState().app.isNotGuest !== true) {
        return <GuestUserRedirect />;
    } else {
        return (
            <Container style={{ paddingTop: '15vh', paddingBottom: '15vh' }}>
                <div className='p-3 my-4 mx-4 bg-light border rounded'>
                    <h1 className='px-2'>
                        <strong>Schedule a Meal Plan</strong>
                    </h1>
                    <Container className='pt-3'>
                        <Form>
                            <Form.Group
                                as={Row}
                                className='px-3 mb-3'
                                controlId='formHorizontalEmail'
                            >
                                <Col sm={6} className='mb-2'>
                                    <Form.Label>Meal Schedule Name:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='My Healthy Meal Plan'
                                        onChange={(e) => {
                                            setMealPlan({
                                                ...mealPlan,
                                                name: e.target.value,
                                            });
                                        }}
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
                                        onChange={(e) => {
                                            setMealPlan({
                                                ...mealPlan,
                                                private: e.target.checked,
                                            });
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>

                        <Form.Label className='px-1'>Meals by day:</Form.Label>
                        <Accordion>
                            {DAYS.map((day, i) => {
                                return (
                                    <SchedulerMealDay
                                        key={day}
                                        day={day}
                                        id={day}
                                        index={i}
                                        submitDay={submitDay}
                                        editable={true}
                                        mealList={null}
                                    />
                                );
                            })}
                        </Accordion>

                        <Row className='mt-3'>
                            <Col md={10} sm={9} xs={8}></Col>
                            <Col md={2} sm={3} xs={4}>
                                <Button
                                    variant='primary'
                                    type='Button'
                                    className='btn-block'
                                    onClick={submit_plan}
                                >
                                    Submit{' '}
                                    <i className='bi bi-chevron-right'></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {success ? (
                    <div
                        className='alert alert-dismissible alert-success'
                        role='alert'
                    >
                        Meal Plan was scheduled successfully.
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='alert'
                            aria-label='Close'
                        ></button>
                    </div>
                ) : (
                    <></>
                )}
            </Container>
        );
    }
}

export default Scheduler;
