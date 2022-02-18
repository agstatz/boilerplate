/**
 * QuizQuestion.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences. This holds the framework
 * for an individual question component
 * 
 * @author Ashton Statz
 */

 import { Stack, Container } from "react-bootstrap";

 function QuizQuestion(props : any) {
   return (
        <Container>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
                <Stack gap={2}>
                    <h2>{props.description}</h2>
                </Stack>
            </div>
        </Container>
   );
 }
 
 export default QuizQuestion;
 