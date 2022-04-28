/**
 * MealPlanIndividualView.jsx
 * displays an individual meal plan to be selected
 *
 * @author Ashton Statz
 */

import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';

function MealPlanIndividualView(props) {
    const [hover, setHover] = useState(false);

    const handleSetSelected = (e) => {
        props.selectMealPlan(props.mealPlan);
    };

    return (
        <Row
            className={`py-2 my-1 rounded meal-plan-view ${
                hover || props.isSelected ? 'bg-white fw-bold' : ''
            }`}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={handleSetSelected}
        >
            <Col id={props.mealPlan._id}>{props.mealPlan.name}</Col>
            <Col id={props.mealPlan._id}>{props.mealPlan.owner}</Col>
            <Col id={props.mealPlan._id}>{props.mealPlan.likes}</Col>
        </Row>
    );
}

export default MealPlanIndividualView;
