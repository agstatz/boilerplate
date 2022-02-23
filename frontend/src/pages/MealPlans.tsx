/**
 *  MealPlans.tsx
 *  Page that hosts public meal plans
 * 
 * @author Ashton Statz
 */

 import { Container } from 'react-bootstrap';
 import { MealPlanList } from '../components/';

 function MealPlans() {
   return (
       <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
        <div className="p-3 my-4 mx-4 bg-light border rounded" >
            <h1>Public Meal Plans</h1>
            <MealPlanList displayPrivate={false}/>
        </div>
        
        </Container>
   );
 }
 
 export default MealPlans;