/**
 * RegisterForm.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences.
 * 
 * @author Ashton Statz
 */

import { Stack, Container, Button, Form } from "react-bootstrap";
import { useState } from "react";
import RangeSlider from 'react-bootstrap-range-slider';

import { store } from "../store/store.js"

/**
 * QuizQuestion.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences. This holds the framework
 * for an individual question component
 * 
 * @author Ashton Statz
 */

function PreferenceQuiz() {

    const [meatScore, setMeatScore] = useState(0);                  // meat dietary restrictions
    const [dairyScore, setDairyScore] = useState(0);                // dairy dietary restrictions
    const [glutenScore, setGlutenScore] = useState(0);              // gluten dietary restrictions
    const [nutScore, setNutScore] = useState(0);                    // nut dietary restrictions
    const [nutritionScore, setNutritionScore] = useState(0);        // nutrition dietary score


    const [questionNumber, setQuestionNumber] = useState(0);        // stores the q number user is on

    const username = store.getState().app.username;

    const incrementQuestion = () => {
        const newNum = questionNumber + 1;
        setQuestionNumber(newNum);
    }

    const decrementQuestion = () => {
        const newNum = questionNumber - 1;
        setQuestionNumber(newNum < 0 ? 0 : newNum);
    }

    const getQuizContent = () => {
        switch (questionNumber) {
            case 0:
                return (
                    // Opening Display
                    <Container style={{ paddingTop: '12vh'}}>
                        <div className="p-3 my-4 mx-4 bg-light border rounded">
                            <Stack gap={2}>
                                <h1>Let's find out your preferences</h1>
                                <p>The following quiz will ask you questions about your food preferences and restrictions.
                                    It is solely used to provide better recommendations for you.
                                </p>
                                <Button onClick={incrementQuestion}>Let's start <i className="bi bi-chevron-right"></i></Button>
                            </Stack>
                        </div>
                    </Container>
                );
            case 1:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 1</h1>
                            <p>Are you a vegetarian, vegan, or pescatarian?</p>
                        </Stack>
                        <Stack className="p-1 d-flex justify-content-center">
                            <Form.Check 
                                type='radio'
                                label='Vegetarian'
                                name="veg_status"
                            />
                            <Form.Check 
                                type='radio'
                                label='Vegan'
                                name="veg_status"
                            />
                            <Form.Check 
                                type='radio'
                                label='Pescatarian'
                                name="veg_status"
                            />
                            <Form.Check 
                                type='radio'
                                label='None of these apply'
                                name="veg_status"
                            />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 2:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 2</h1>
                            <p>Do you have a dairy allergy?</p>
                        </Stack>
                        <Stack className="p-1 d-flex justify-content-center">
                            <Form.Check 
                                type='radio'
                                label='Yes'
                                name="dairy_allergy"
                            />
                            <Form.Check 
                                type='radio'
                                label='No'
                                name="dairy_allergy"
                            />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 3:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 3</h1>
                            <p>Do you have a gluten allergy?</p>
                        </Stack>
                        <Stack className="p-1 d-flex justify-content-center">
                            <Form.Check 
                                type='radio'
                                label='Yes'
                                name="gluten_allergy"
                            />
                            <Form.Check 
                                type='radio'
                                label='No'
                                name="gluten_allergy"
                            />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 4:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 4 </h1>
                            <p>Do you have any allergies to nuts?</p>
                        </Stack>
                        <Stack className="p-1 d-flex justify-content-center">
                            <Form.Check 
                                type='radio'
                                label='Yes'
                                name="nut_allergy"
                            />
                            <Form.Check 
                                type='radio'
                                label='No'
                                name="nut_allergy"
                            />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 5:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 5 </h1>
                            <p>Do you observe any of the following dietary religious laws?</p>
                            <Stack className="p-1 d-flex justify-content-center">
                                <Form.Check 
                                    type='radio'
                                    label='Halal'
                                    name="law_status"
                                />
                                <Form.Check 
                                    type='radio'
                                    label='Kosher'
                                    name="law_status"
                                />
                                <Form.Check 
                                    type='radio'
                                    label='None'
                                    name="law_status"
                                />
                            </Stack>
                            <br />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 6:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 6 </h1>
                            <p>How important is nutritional value of the food you eat to you?
                                 Rate 5 for very important, 0 for not important at all.</p>
                            <Container className="p-1 d-flex justify-content-center">
                            <RangeSlider
                                value={nutritionScore}
                                onChange={changeEvent => setNutritionScore(changeEvent.target.value)}
                                min={0}
                                max={5}
                                />
                            </Container>
                            <br />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={incrementQuestion}>Submit Preferences <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 7:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>That's all!</h1>
                            <p>The data will be compiled and will help provide more accurate recommendations for you!</p>
                            <Button href={`/profile/${username}`}>Head to Profile Page <i className="bi bi-chevron-right"></i></Button>
                        </Stack>
                    </div>
                );
            default:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Something went wrong...</h1>
                            <p>Oops. the question display encountered an error.</p>
                            <Button onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                        </Stack>
                    </div>
                );
        }
    }

    return (
            <Container style={{ paddingBottom: '40vh'}}>
                {getQuizContent()}
            </Container>
    );
}

export default PreferenceQuiz;
