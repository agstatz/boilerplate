/**
 *  MealPlanIndividual.jsx
 *  Page that displays public meal plans
 *
 * @author Ashton Statz, Arjan Mobin
 */

import { Container, Form, Row, Col, Button, Accordion } from 'react-bootstrap';
import { SchedulerMealDay } from '../components/Scheduler/';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { store } from '../store/store';
import axios from 'axios';

function MealPlanIndividual() {
    const { id } = useParams();
    const history = useHistory();
    const username = store.getState().app.username;
    const [mealPlan, setMealPlan] = useState([{}]);
    const [tmpMealPlan, setTmpMealPlan] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);
    const [liked, setLiked] = useState(false);

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
            const { data: response } = await axios.get(
                `http://localhost:3001/api/meal-plans/${id}`
            );

            setMealPlan(response);

            if (username) {
                const { data: response } = await axios.get(
                    'http://localhost:3001/api/meal-plan-like?mealplan=' +
                        id +
                        '&user=' +
                        username
                );

                setLiked(response.like);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, []);

    function submitDay(meals, day) {
        let index = DAYS.indexOf(day);
        let currentMealPlan = mealPlan.meals;
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
        currentMealPlan.meals = mealslist;
        setMealPlan(currentMealPlan);
    }

    function deletePlan() {
        axios
            .delete(`http://localhost:3001/api/meal-plans/${id}`)
            .then(function (response) {
                history.push('/meal-plans');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEditButton = () => {
        setTmpMealPlan(mealPlan);
        setEditable(true);
    };

    const handleCancelButton = () => {
        setEditable(false);
        setMealPlan(tmpMealPlan);
    };

    const submitPlanChanges = () => {
        axios
            .put(`http://localhost:3001/api/meal-plans/${id}`, {
                _id: mealPlan._id,
                name: mealPlan.name,
                owner: mealPlan.owner,
                meals: mealPlan.meals,
                likes: mealPlan.likes,
                private: mealPlan.private,
            })
            .then(function (response) {
                setEditable(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const updateLikes = (newLikesValue) => {
        axios
            .put(`http://localhost:3001/api/meal-plans/${id}`, {
                _id: mealPlan._id,
                name: mealPlan.name,
                owner: mealPlan.owner,
                meals: mealPlan.meals,
                likes: newLikesValue,
                private: mealPlan.private,
            })
            .then(function (response) {
                setEditable(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function handleMealScheduleChange(e) {
        if (editable) {
            setMealPlan({
                ...mealPlan,
                name: e.target.value,
            });
        }
    }

    function handleChangePrivate(e) {
        if (editable) {
            setMealPlan({
                ...mealPlan,
                private: e.target.checked,
            });
        }
    }

    function LikeButton() {
        return (
            <h3>
                {liked ? (
                    <i
                        className='bi bi-hand-thumbs-up-fill'
                        style={{ cursor: 'pointer' }}
                        onClick={handleLikeButton}
                    ></i>
                ) : (
                    <i
                        className='bi bi-hand-thumbs-up'
                        style={{ cursor: 'pointer' }}
                        onClick={handleLikeButton}
                    ></i>
                )}
            </h3>
        );
    }

    function handleLikeButton() {
        let newLikeQuantity = mealPlan.likes;

        if (!liked) {
            newLikeQuantity++;
        } else {
            newLikeQuantity--;
        }

        setMealPlan({
            ...mealPlan,
            likes: newLikeQuantity,
        });

        console.log('changing like to ' + !liked);

        const { data: response } = axios.put(
            'http://localhost:3001/api/meal-plan-like?mealplan=' +
                id +
                '&user=' +
                username +
                '&like=' +
                !liked
        );

        console.log(response);

        updateLikes(newLikeQuantity);

        setLiked(!liked);
    }

    return (
        <Container style={{ paddingTop: '15vh', paddingBottom: '15vh' }}>
            <div className='p-3 my-4 mx-4 bg-light border rounded'>
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
                                <Form.Label>Meal Schedule Name: </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='My Healthy Meal Plan'
                                    value={mealPlan.name}
                                    onChange={handleMealScheduleChange}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Owner:</Form.Label>
                                <Form.Control disabled value={mealPlan.owner} />
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
                                    onChange={handleChangePrivate}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Container>
                        <Form.Label className='px-1'>Meals by day:</Form.Label>
                        <Accordion>
                            {!loading ? (
                                DAYS.map((day, i) => {
                                    return (
                                        <SchedulerMealDay
                                            key={day}
                                            day={day}
                                            id={day}
                                            index={i}
                                            submitDay={submitDay}
                                            editable={editable}
                                            mealList={mealPlan.meals[i]}
                                        />
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </Accordion>
                        {!editable && username === mealPlan.owner ? (
                            <Row className='mt-3'>
                                <Col md={10} sm={9} xs={8}></Col>
                                <Col md={2} sm={3} xs={4}>
                                    <Button
                                        variant='primary'
                                        type='Button'
                                        className='btn-block'
                                        onClick={handleEditButton}
                                    >
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                        ) : username === mealPlan.owner ? (
                            <Row className='mt-3'>
                                <Col md={5}></Col>
                                <Col md={2}>
                                    <Button
                                        variant='secondary'
                                        type='Button'
                                        className='btn-block'
                                        onClick={handleCancelButton}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        variant='danger'
                                        type='Button'
                                        className='btn-block'
                                        onClick={deletePlan}
                                    >
                                        Delete
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button
                                        variant='primary'
                                        type='Button'
                                        className='btn-block'
                                        onClick={submitPlanChanges}
                                    >
                                        Submit Changes{' '}
                                        <i className='bi bi-chevron-right'></i>
                                    </Button>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                    </Container>
                </Container>
            </div>
            {username !== undefined ? (
                <div className='p-3 my-4 mx-4 bg-light border rounded'>
                    <h5>
                        {mealPlan.likes === 0
                            ? 'No one has liked this meal plan.'
                            : mealPlan.likes === 1
                            ? '1 person liked this meal plan.'
                            : mealPlan.likes + ' likes'}
                    </h5>
                    <LikeButton />
                </div>
            ) : (
                <></>
            )}
        </Container>
    );
}

export default MealPlanIndividual;
