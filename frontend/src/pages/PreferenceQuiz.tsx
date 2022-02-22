/**
 * RegisterForm.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences.
 * 
 * @author Ashton Statz
 */


import { Stack, Container, Button } from "react-bootstrap";
import { useState } from "react";

/**
 * QuizQuestion.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences. This holds the framework
 * for an individual question component
 * 
 * @author Ashton Statz
 */

function PreferenceQuiz() {

const [questionNumber, setQuestionNumber] = useState(0);

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
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Stack gap={2}>
                        <h1>Let's find out your preferences</h1>
                        <p>The following quiz will ask you questions about your food preferences and restrictions.
                            It is solely used to provide better recommendations for you.
                        </p>
                        <Button onClick={incrementQuestion}>Let's start <i className="bi bi-chevron-right"></i></Button>
                    </Stack>
                </div>
            );
        case 1:
            return (
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Stack gap={2}>
                        <h1>Question 1</h1>
                        <p>Are you a vegetarian, vegan, or pescatarian?</p>
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
                    <Container className="d-flex justify-content-center">
                        <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                        <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                    </Container>
                </div>
            )
        case 4:
            return (
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Stack gap={2}>
                        <h1>Question 4 </h1>
                        <p>Do you have any allergies to nuts?</p>
                    </Stack>
                    <Container className="d-flex justify-content-center">
                        <Button className="mx-2" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
                        <Button className="mx-2" onClick={incrementQuestion}>Next <i className="bi bi-chevron-right"></i></Button>
                    </Container>
                </div>
            );
        default:
            return (
                <div className="p-3 my-4 mx-4 bg-light border rounded">
                    <Stack gap={2}>
                        <h1>Something went wrong...</h1>
                        <p>Oops. the question display encountered an error.</p>
                        <Button className="" onClick={decrementQuestion}><i className="bi bi-chevron-left"></i> Back</Button>
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
