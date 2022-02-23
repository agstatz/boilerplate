/**
 * MealPlanList.tsx
 * 
 * @author Ashton Statz
 */

 import { Stack, Container, Table, Form } from "react-bootstrap";

 function MealPlanList(props : any) {
   return (
        <Container>
            <div className="p-2 my-2 mx-2 bg-light">
                <h4 className="px-2 pt-2">Meal Plans</h4>
                <Table striped responsive hover size="sm" variant="light">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Plan Name</th>
                        <th>Private</th>
                        <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Salads all week</td>
                        <td><Form.Check /></td>
                        <td>agstatz</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Meat Madness</td>
                        <td><Form.Check /></td>
                        <td>agstatz</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Best Pizza</td>
                        <td><Form.Check /></td>
                        <td>agstatz</td>
                        </tr>
                    </tbody>
                    </Table>
            </div>
        </Container>
   );
 }

 export default MealPlanList;