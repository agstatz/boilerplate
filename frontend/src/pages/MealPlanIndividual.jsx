/**
 *  MealPlanIndividual.jsx
 *  Page that displays public meal plans
 * 
 * @author Ashton Statz
 */

import { Container, Stack, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { store } from '../store/store';
import axios from "axios";

 function MealPlanIndividual() {

    const { id } = useParams();

    const username = store.getState().app.username;

    const [mealPlanData, setMealPlanData] = useState([{}]);

    const togglePrivate = () => {

        if (username !== mealPlanData.owner) {
            return;
        }

        var newValue = !mealPlanData.private;

        axios.put(`http://localhost:3001/api/meal-plans/${id}`,{
            _id: mealPlanData._id,
            name: mealPlanData.name,
            owner: mealPlanData.owner,
            likes: mealPlanData.likes,
            private: newValue
        })
        .then (function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        setMealPlanData({
            _id: mealPlanData._id,
            name: mealPlanData.name,
            owner: mealPlanData.owner,
            likes: mealPlanData.likes,
            private: newValue
        });
    }

    useEffect( async() => {
        try {
            const {data:response} = await axios.get(`http://localhost:3001/api/meal-plans/${id}`);
            setMealPlanData(response);
        } catch (err) {
            console.error(err);
        }
    }, [])

    return (
        <Container style={{ paddingTop: '15vh', paddingBottom: '15vh'}} >
            <div className="p-3 my-4 mx-4 bg-light border rounded" >
                <h3><strong>{mealPlanData.name}</strong></h3>
                <Stack>
                    <div>Owner: {mealPlanData.owner}</div>
                    <div>Private: {mealPlanData.private ? "yes" : "no"}</div>
                    <div>Likes: {mealPlanData.likes}</div>
                    <Button className="mx-auto" onClick={togglePrivate}>Toggle Private</Button>
                </Stack>
            </div>
            
        </Container>
    );
 }
 
 export default MealPlanIndividual;