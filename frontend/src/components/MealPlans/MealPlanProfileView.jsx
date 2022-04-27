/**
 * MealPlanProfileView.jsx
 * displays meal plan to be selected and used
 * by a user on their profile page
 *
 * @author Ashton Statz
 */

import { Container, Stack, Button } from 'react-bootstrap';
import { useState } from 'react';

import { MealPlanSelector } from './';

function MealPlanProfileView(props) {
    const [mealPlan, setMealPlan] = useState();
    const [currentState, setCurrentState] = useState('none');

    const handleSelectMealPlan = () => {
        setCurrentState('select');
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
            ) : currentState === 'select' ? (
                <MealPlanSelector store={props.store} />
            ) : (
                <>bruh</>
            )}
        </Container>
    );
}

export default MealPlanProfileView;
