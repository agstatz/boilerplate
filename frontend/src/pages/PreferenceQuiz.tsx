/**
 * RegisterForm.tsx
 * Upon signing up, a user must take a quiz that will
 * assess their food preferences.
 * 
 * @author Ashton Statz
 */

 import { Stack, Container } from "react-bootstrap";

 function PreferenceQuiz() {
   return (
        <Container style={{ paddingBottom: '40vh'}}>
            <div className="p-3 my-4 mx-4 bg-light border rounded">
                <Stack gap={2}>
                    <h1>Let's find out your preferences</h1>
                    <p>The following quiz will ask you questions about your food preferences and restrictions.
                        It is solely used to provide better recommendations for you.
                    </p>
                </Stack>
            </div>
        </Container>
   );
 }
 
 export default PreferenceQuiz;
 