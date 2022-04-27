/**
 * MealPlanSelector.jsx
 * displays meal plans that can be selected
 *
 * @author Ashton Statz
 */

import { Container, Stack, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import axios from 'axios';

function MealPlanSelector(props) {
    const [mealPlans, setMealPlans] = useState();
    const [currentState, setCurrentState] = useState('none');
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
            console.log(list);

            setLoading(false);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    }, []);

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
                            <h4>Meal Plans</h4>
                            {mealPlans ? (
                                mealPlans.map((item) => {
                                    <li>{item.name}</li>;
                                })
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </>
                )}
            </div>
        </Container>
    );
}

export default MealPlanSelector;
