/**
 * MealPlanSelector.jsx
 * displays meal plans that can be selected
 *
 * @author Ashton Statz
 */

import { Container, Stack, Row, Col, Button } from 'react-bootstrap';
import { MealPlanIndividualView } from './';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MealPlanSelector(props) {
    const [mealPlans, setMealPlans] = useState();
    const [selectedMealPlan, setSelectedMealPlan] = useState({});
    const [mealPlanList, setMealPlanList] = useState([]);
    const [loading, setLoading] = useState(false);
    const username = props.store.getState().app.username;

    useEffect(async () => {
        // filter private or not private rows
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                'http://localhost:3001/api/meal-plans'
            );
            setMealPlans(response);

            let list = response;
            for (var i = 0; i < list.length; i++) {
                // remove if not the user's meal plan or public
                if (
                    list[i].ownerName !== username &&
                    list[i].private === true
                ) {
                    list.splice(i, 1);
                }
            }
            setMealPlans(list);

            let listOfMealPlans = [];
            for (var i = 0; i < list.length; i++) {
                listOfMealPlans.push(false);
            }

            setLoading(false);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }, []);

    function handleSelectMealPlan(mealPlan) {
        setSelectedMealPlan(mealPlan);
        var index = mealPlans.indexOf(mealPlan);
        var list = mealPlanList;
        for (var i = 0; i < list.length; i++) {
            list[i] = false;
        }
        list[index] = true;
    }

    function handleSubmit() {
        // call API to make this a meal plan registered to a user
        axios
            .put('http://localhost:3001/api/users/mealPlan/' + username, {
                data: selectedMealPlan,
            })
            .then((res) => {
                console.log(res);
                props.returnSelectedMeal(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Container>
            <div className='p-5 text-center'>
                {loading ? (
                    <Stack>
                        <h4>Loading</h4>
                    </Stack>
                ) : (
                    <>
                        <Stack>
                            <h4>
                                <strong>Select a Meal Plan</strong>
                            </h4>
                            <Row>
                                <Col>
                                    <strong>Name</strong>
                                </Col>
                                <Col>
                                    <strong>Owner</strong>
                                </Col>
                                <Col>
                                    <strong>Likes</strong>
                                </Col>
                            </Row>
                            {mealPlans ? (
                                mealPlans.map((item, i) => (
                                    <MealPlanIndividualView
                                        key={item._id}
                                        mealPlan={item}
                                        selectMealPlan={handleSelectMealPlan}
                                        isSelected={mealPlanList[i]}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                            <Button onClick={handleSubmit} className='mt-2'>
                                Submit <i className='bi bi-chevron-right'></i>
                            </Button>
                        </Stack>
                    </>
                )}
            </div>
        </Container>
    );
}

export default MealPlanSelector;
