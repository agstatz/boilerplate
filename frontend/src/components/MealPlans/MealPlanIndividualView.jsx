/**
 * MealPlanIndividualView.jsx
 * displays an individual meal plan to be selected
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
                        </Stack>
                    </>
                )}
            </div>
        </Container>
    );
}

export default MealPlanSelector;
