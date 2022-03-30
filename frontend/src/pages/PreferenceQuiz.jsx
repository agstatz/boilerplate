/**
 * RegisterForm.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences.
 * 
 * @author Ashton Statz, Gaurav Manglani
 */

import axios from 'axios';
import { Stack, Container, Button, Form } from "react-bootstrap";
import { useState } from "react";
import RangeSlider from 'react-bootstrap-range-slider';

import { store, UpdateForm } from "../store/store.js"

/**
 * QuizQuestion.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences. This holds the framework
 * for an individual question component
 * 
 * @author Ashton Statz, Gaurav Manglani
 */

function PreferenceQuiz() {
    const [meatScore, setMeatScore] = useState(0);                  // meat dietary restrictions
    const [religionScore, setReligionScore] = useState(0);          // religious dietary restrictions
    const [dairyScore, setDairyScore] = useState(false);            // dairy dietary restrictions
    const [glutenScore, setGlutenScore] = useState(false);          // gluten dietary restrictions
    const [nutScore, setNutScore] = useState(false);                // nut dietary restrictions
    const [nutritionScore, setNutritionScore] = useState(0);        // nutrition dietary score
    const [mealSwipes, setMealSwipes] = useState(7);                // weekly meel swipes

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

    const submitForm = (event) => {
        // prevent page from reloading
        event.preventDefault();

        var allergies = []
        if (dairyScore) {
            allergies.push("dairy")
        }
        if (glutenScore) {
            allergies.push("gluten")
        }
        if (nutScore) {
            allergies.push("nuts")
        }

        var diets = []
        if (meatScore == 1) {
            diets.push("vegetarian")
        }
        else if(meatScore == 2) {
            diets.push("vegan")
        }
        else if(meatScore == 3) {
            diets.push("pescatarian")
        }
        if (religionScore == 1) {
            diets.push("halal")
        }
        else if (religionScore == 2) {
            diets.push("kosher")
        }

        const userInfo = {
            username: username,
            mealSwipes: mealSwipes,
            allergies: allergies,
            diets: diets
        }

        axios
            .post('http://localhost:3001/api/editUserPreferences', { data: userInfo })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

            store.dispatch(UpdateForm(("mealSwipes"), mealSwipes));

        const newNum = questionNumber + 1;
        setQuestionNumber(newNum);
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
                                checked={meatScore == 1}
                                onChange={() => setMeatScore(1)}
                            />
                            <Form.Check 
                                type='radio'
                                label='Vegan'
                                name="veg_status"
                                checked={meatScore == 2}
                                onChange={() => setMeatScore(2)}
                            />
                            <Form.Check 
                                type='radio'
                                label='Pescatarian'
                                name="veg_status"
                                checked={meatScore == 3}
                                onChange={() => setMeatScore(3)}
                            />
                            <Form.Check 
                                type='radio'
                                label='None of these apply'
                                name="veg_status"
                                checked={meatScore == 0}
                                onChange={() => setMeatScore(0)}
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
                                checked={dairyScore}
                                onChange={() => setDairyScore(true)}
                            />
                            <Form.Check 
                                type='radio'
                                label='No'
                                name="dairy_allergy"
                                checked={!dairyScore}
                                onChange={() => setDairyScore(false)}
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
                                checked={glutenScore}
                                onChange={() => setGlutenScore(true)}
                            />
                            <Form.Check 
                                type='radio'
                                label='No'
                                name="gluten_allergy"
                                checked={!glutenScore}
                                onChange={() => setGlutenScore(false)}
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
                                checked={nutScore}
                                onChange={() => setNutScore(true)}
                            />
                            <Form.Check 
                                type='radio'
                                label='No'
                                name="nut_allergy"
                                checked={!nutScore}
                                onChange={() => setNutScore(false)}
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
                                    checked={religionScore == 1}
                                    onChange={() => setReligionScore(1)}
                                />
                                <Form.Check 
                                    type='radio'
                                    label='Kosher'
                                    name="law_status"
                                    checked={religionScore == 2}
                                    onChange={() => setReligionScore(2)}
                                />
                                <Form.Check 
                                    type='radio'
                                    label='None'
                                    name="law_status"
                                    checked={religionScore == 0}
                                    onChange={() => setReligionScore(0)}
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
                            <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 7:
                return (
                    <div className="p-3 my-4 mx-4 bg-light border rounded">
                        <Stack gap={2}>
                            <h1>Question 7 </h1>
                            <p>How many meal swipes do you have available per week?</p>
                            <Container className="p-1 d-flex justify-content-center">
                            <RangeSlider
                                value={mealSwipes}
                                onChange={changeEvent => setMealSwipes(changeEvent.target.value)}
                                min={7}
                                max={30}
                                />
                            </Container>
                            <br />
                        </Stack>
                        <Container className="d-flex justify-content-center">
                            <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                            <Button className="mx-2" onClick={submitForm}>Submit Preferences <i className="bi bi-chevron-right"></i></Button>
                        </Container>
                    </div>
                );
            case 8:
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
