/**
 * SchedulerMealDay.jsx
 * Displays a list of meals for a given day
 * for the meal scheduler
 *
 * @author Ashton Statz
 */

import { Stack, Button, Accordion, Badge, Container, Col, Row, Modal, Form } from 'react-bootstrap';
import { useState, useEffect, useReducer } from 'react';
import { SchedulerMealIndividual } from '.';
import axios from 'axios';
import { store } from "../../store/store.js";
import { breadcrumbsClasses } from '@mui/material';

function SchedulerMealDay(props) {
    const [mealList, setMealList] = useState([]);
    const [finishedArr, setFinishedArr] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [mealListLength, setMealListLength] = useState(0);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [foodInfoList, setFoodInfoList] = useState([]);
    const [showdvmodal, setShowdvmodal] = useState(false);
    const [dvSums, setDvSums] = useState({ calories: "0", totalFat: "0", saturatedFat: "0", cholesterol: "0",sodium: "0", totalCarbohydrate: 0,
                                           addedSugar: "0", dietaryFiber: "0", protein: "0", calcium: "0", iron: "0"});
    const [dvForm, setDvForm] = useState({ calories: "2000", totalFat: "78", saturatedFat: "20", cholesterol: "300",sodium: "2300", totalCarbohydrate: 275,
                                           addedSugar: "50", dietaryFiber: "28", protein: "50", calcium: "1300", iron: "18"});
    const [formMessage, setFormMessage] = useState("");
    const [hideDVs, setHideDVs] = useState(false);

    useEffect(async () => {
        if (!props.editable) {
            //load and populate all values as this is not an
            //editable meal schedule
            if (props.mealList !== undefined) {
                setMealList(props.mealList);
                setMealListLength(props.mealList.length);
            }
        }
        if (props.hideDVs) {
            setHideDVs(true);
        }
        if (!(window.location.pathname).includes("schedule")) {
            setHideDVs(true);
        }
    }, []);

    function handleUpdateMeal(key, meal_name, meal_location) {
        let list = mealList;

        if (meal_name === '*') {
            list[key] = {
                key: key,
                name: list[key].name,
                location: meal_location,
                foods: list[key].foods,
            };
        } else if (meal_location === '*') {
            list[key] = {
                key: key,
                name: meal_name,
                location: list[key].location,
                foods: list[key].foods,
            };
        } else {
            list[key] = {
                key: key,
                name: meal_name,
                location: meal_location,
                foods: list[key].foods,
            };
        }
        setMealList(list);
    }

    function handleUpdateFinished(index, finishedValue) {
        let finishedList = finishedArr;
        finishedList[index] = finishedValue;
        setFinishedArr(finishedList);
        forceUpdate();
    }

    function handleAddMeal() {
        setMealListLength(mealListLength + 1);
        let list = mealList;
        list.push({
            key: mealListLength,
            name: '',
            location: '',
            foods: [],
        });
        let infoList = foodInfoList;
        infoList.push({
            key: mealListLength,
            foods: [],
        });
        let finishedList = finishedArr;
        finishedList.push(false);
        setSubmitted(false);
        setFinishedArr(finishedList);
        setMealList(list);
        setFoodInfoList(infoList);
    }

    function handleRemoveMeal(key) {
        let list = mealList;
        list.splice(key, 1);

        for (let i = 0; i < list.length; i++) {
            list[i] = { ...list[i], key: i };
        }
        setMealList(list);
        setMealListLength(mealListLength - 1);

        let finishedList = finishedArr;
        finishedList.splice(key, 1);
        setFinishedArr(finishedList);
        setSubmitted(false);

        let infoList = foodInfoList;
        infoList.splice(key, 1);

        for (let i = 0; i < infoList.length; i++) {
            infoList[i] = { ...infoList[i], key: i,
                calories: 0,
                totalFat: 0,
                saturatedFat: 0,
                cholesterol: 0,
                sodium: 0,
                totalCarbohydrate: 0,
                addedSugar: 0,
                dietaryFiber: 0,
                protein: 0,
                calcium: 0,
                iron: 0 
            };
        }
        setFoodInfoList(infoList);
        calculateDvs();

        forceUpdate();
        return list;
    }

    // Adding a food to a meal's list
    function handleAddFoodToList(meal_key, food_key) {
        let list = mealList;
        list[meal_key].foods.push({
            key: food_key,
            name: '',
            food_qty: 1,
        });
        setMealList(list);
        let infoList = foodInfoList;
        infoList[meal_key].foods.push({
            key: food_key,
            calories: 0,
            totalFat: 0,
            saturatedFat: 0,
            cholesterol: 0,
            sodium: 0,
            totalCarbohydrate: 0,
            addedSugar: 0,
            dietaryFiber: 0,
            protein: 0,
            calcium: 0,
            iron: 0
        });
        setFoodInfoList(infoList);
        return list[meal_key].foods;
    }

    // Updating a food of a meal's list
    function handleUpdateFood(meal_key, food_key, food_name, food_qty) {
        let list = mealList;
        if (food_qty === '*') {
            list[meal_key].foods[food_key] = {
                key: food_key,
                name: food_name,
                food_qty: list[meal_key].foods[food_key].food_qty,
            };
        } else if (food_name === '*') {
            list[meal_key].foods[food_key] = {
                key: food_key,
                name: list[meal_key].foods[food_key].name,
                food_qty: food_qty,
            };
        } else {
            list[meal_key].foods[food_key] = {
                key: food_key,
                name: food_name,
                food_qty: food_qty,
            };
        }
        axios.get("http://localhost:3001/api/foods/foodname/".concat(food_name)).then((res) => {
            let foodInfo = foodInfoList;
            foodInfo[meal_key].foods[food_key] = {
                calories: parseFoodInfo(res.data.calories) * food_qty,
                totalFat: parseFoodInfo(res.data.totalFat) * food_qty,
                saturatedFat: parseFoodInfo(res.data.saturatedFat) * food_qty,
                cholesterol: parseFoodInfo(res.data.cholesterol) * food_qty,
                sodium: parseFoodInfo(res.data.sodium) * food_qty,
                totalCarbohydrate: parseFoodInfo(res.data.totalCarbohydrate) * food_qty,
                addedSugar: parseFoodInfo(res.data.addedSugar) * food_qty,
                dietaryFiber: parseFoodInfo(res.data.dietaryFiber) * food_qty,
                protein: parseFoodInfo(res.data.protein) * food_qty,
                calcium: parseFoodInfo(res.data.calcium) * food_qty,
                iron: parseFoodInfo(res.data.iron) * food_qty
            }
            setFoodInfoList(foodInfo);
            setMealList(list);
            calculateDvs();
            return list[meal_key].foods;
        }).catch((err) => {
            setMealList(list);
            calculateDvs();
            return list[meal_key].foods;
        });
        return list[meal_key].foods;
    }

    // Removing a food from a meal's list
    function handleRemoveFoodFromList(meal_key, food_key) {
        let list = mealList;
        list[meal_key].foods.splice(food_key, 1);
        for (let i = 0; i < list[meal_key].foods.length; i++) {
            list[meal_key].foods[i] = {
                key: i,
                name: list[meal_key].foods[i].name,
            };
        }
        setMealList(list);

        let infoList = foodInfoList;
        infoList[meal_key].foods.splice(food_key, 1);
        for (let i = 0; i < infoList[meal_key].foods.length; i++) {
            infoList[meal_key].foods[i] = {
                key: i,
                calories: 0,
                totalFat: 0,
                saturatedFat: 0,
                cholesterol: 0,
                sodium: 0,
                totalCarbohydrate: 0,
                addedSugar: 0,
                dietaryFiber: 0,
                protein: 0,
                calcium: 0,
                iron: 0
            };
        }
        setFoodInfoList(infoList);
        calculateDvs();

        return list[meal_key].foods;
    }

    function handleSubmitDay() {
        props.submitDay(mealList, props.day);
        for (var i = 0; i < mealListLength; i++) {
            handleUpdateFinished(i, true);
        }
        setSubmitted(true);
    }

    // Button to add a meal to list of meals
    function AddMealButton() {
        return (
            <Button variant='secondary' onClick={handleAddMeal}>
                Add a Meal
            </Button>
        );
    }

    function SubmitDayButton() {
        return (
            <Button onClick={handleSubmitDay}>
                {submitted ? 'Resubmit' : 'Submit'} Meals for {props.day}
            </Button>
        );
    }

    function parseFoodInfo(str) {
        let ret = str;
        if (ret === "" || ret === undefined) {
            return 0;
        }
        if (ret.includes('<')) {
            return 0;
        }
        if (ret.includes('.')) {
            return 0;
        }
        if (ret.includes("mg")) {
            return Number((ret.substring(0,ret.indexOf("mg"))))
        }
        if (ret.includes("g")) {
            return Number((ret.substring(0,ret.indexOf("g"))))
        }
        return Number(ret);
    }

    function parseDecimal(str) {
        let ret = str;
        if (ret.includes('.')) {
            if (ret.indexOf('.') === 0) {
                return 0;
            }
            if (/^([0-9]{4,})$/.test(ret.substring(0, ret.indexOf('.')))) {
                return ">999";
            }
            return ret.substring(0, ret.indexOf('.'));
        }
        if (/^([0-9]{4,})$/.test(ret)) {
            return ">999";
        }
        return ret;
    }

    function calculateDvs() {
        let sums = { calories: 0, totalFat: 0, saturatedFat: 0, cholesterol: 0,sodium: 0, totalCarbohydrate: 0,
            addedSugar: 0, dietaryFiber: 0, protein: 0, calcium: 0, iron: 0 };
        for (var j = 0; j < foodInfoList.length; j++) {
            for (var k = 0; k < foodInfoList[j].foods.length; k++) {
                sums = { 
                    calories: sums.calories + foodInfoList[j].foods[k].calories,
                    totalFat: sums.totalFat + foodInfoList[j].foods[k].totalFat,
                    saturatedFat: sums.saturatedFat + foodInfoList[j].foods[k].saturatedFat,
                    cholesterol: sums.cholesterol + foodInfoList[j].foods[k].cholesterol,
                    sodium: sums.sodium + foodInfoList[j].foods[k].sodium,
                    totalCarbohydrate: sums.totalCarbohydrate + foodInfoList[j].foods[k].totalCarbohydrate,
                    addedSugar: sums.addedSugar + foodInfoList[j].foods[k].addedSugar,
                    dietaryFiber: sums.dietaryFiber + foodInfoList[j].foods[k].dietaryFiber,
                    protein: sums.protein + foodInfoList[j].foods[k].protein,
                    calcium: sums.calcium + foodInfoList[j].foods[k].calcium,
                    iron: sums.iron + foodInfoList[j].foods[k].iron
                }
            }
        }
        axios.get("http://localhost:3001/api/food-logs/dailyvalues/exists/".concat(store.getState().app.username)).then((res0) => {
            if (res0.data.message) {
                axios.get("http://localhost:3001/api/food-logs/dailyvalues/values/".concat(store.getState().app.username)).then((res) => {
                    let ret = { 
                        calories: parseDecimal(String(sums.calories / res.data.dailyValues.calories * 100)), 
                        totalFat: parseDecimal(String(sums.totalFat / res.data.dailyValues.totalFat * 100)), 
                        saturatedFat: parseDecimal(String(sums.saturatedFat / res.data.dailyValues.saturatedFat * 100)), 
                        cholesterol: parseDecimal(String(sums.cholesterol / res.data.dailyValues.cholesterol * 100)),
                        sodium: parseDecimal(String(sums.sodium / res.data.dailyValues.sodium * 100)), 
                        totalCarbohydrate: parseDecimal(String(sums.totalCarbohydrate / res.data.dailyValues.totalCarbohydrate * 100)),
                        addedSugar: parseDecimal(String(sums.addedSugar / res.data.dailyValues.addedSugar * 100)), 
                        dietaryFiber: parseDecimal(String(sums.dietaryFiber / res.data.dailyValues.dietaryFiber * 100)), 
                        protein: parseDecimal(String(sums.protein / res.data.dailyValues.protein * 100)), 
                        calcium: parseDecimal(String(sums.calcium / res.data.dailyValues.calcium * 100)), 
                        iron: parseDecimal(String(sums.iron / res.data.dailyValues.iron * 100))
                    }
                    setDvSums(ret);
                    return ret;
                }).catch((err) => {
                    console.log(err.response.data.msg);
                });
            }
            else {
                let defaultData = { 
                    username: store.getState().app.username,
                    calories: 2000,
                    totalFat: 78,
                    saturatedFat: 20,
                    cholesterol: 300,
                    sodium: 2300,
                    totalCarbohydrate: 275,
                    addedSugar: 50,
                    dietaryFiber: 28,
                    protein: 50,
                    calcium: 1300,
                    iron: 18,
                }
                axios.post("http://localhost:3001/api/food-logs/dailyvalue", { data: defaultData }).then((res) => {  
                    let ret = { 
                        calories: parseDecimal(String(sums.calories / 2000 * 100)), 
                        totalFat: parseDecimal(String(sums.totalFat / 78 * 100)), 
                        saturatedFat: parseDecimal(String(sums.saturatedFat / 20 * 100)), 
                        cholesterol: parseDecimal(String(sums.cholesterol / 300 * 100)),
                        sodium: parseDecimal(String(sums.sodium / 2300)), 
                        totalCarbohydrate: parseDecimal(String(sums.totalCarbohydrate / 275 * 100)),
                        addedSugar: parseDecimal(String(sums.addedSugar / 50 * 100)), 
                        dietaryFiber: parseDecimal(String(sums.dietaryFiber / 28 * 100)), 
                        protein: parseDecimal(String(sums.protein / 50 * 100)), 
                        calcium: parseDecimal(String(sums.calcium / 1300 * 100)), 
                        iron: parseDecimal(String(sums.iron / 18 * 100))
                    }
                    setDvSums(ret);
                    return ret;
                }).catch((err) => {
                    console.log(err.response.data.msg);
                });
            }
        }).catch((err) => {
            console.log(err.response.data.msg);
        });
    }

    function handleOpenDVModal() {
        setFormMessage("");
        setShowdvmodal(true);
    }
    function handleCloseDVModal() {
        setShowdvmodal(false);
        setFormMessage("");
    }

    var handleChange = ((event) => {
        event.preventDefault();
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.id;
        setDvForm({...dvForm, [name]: value});
    });

    function changeDVs() {
        
        setFormMessage("");
        if (!/^([0-9]{1,})$/.test(dvForm.calories)) {
            setFormMessage("Calories field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.totalFat)) {
            setFormMessage("Total fat field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.saturatedFat)) {
            setFormMessage("Saturated fat field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.cholesterol)) {
            setFormMessage("Cholesterol field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.sodium)) {
            setFormMessage("Sodium field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.totalCarbohydrate)) {
            setFormMessage("Total carbohydrates field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.addedSugar)) {
            setFormMessage("Added sugar field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.dietaryFiber)) {
            setFormMessage("Dietary fiber field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.protein)) {
            setFormMessage("Protein field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.calcium)) {
            setFormMessage("Calcium field must be a number");
        }
        if (!/^([0-9]{1,})$/.test(dvForm.iron)) {
            setFormMessage("Iron field must be a number");
        }
        const dvData = {
            username: store.getState().app.username,
            isDefault: false,
            calories: dvForm.calories,
            totalFat: dvForm.totalFat,
            saturatedFat: dvForm.saturatedFat,
            cholesterol: dvForm.cholesterol,
            sodium: dvForm.sodium,
            totalCarbohydrate: dvForm.totalCarbohydrate,
            addedSugar: dvForm.addedSugar,
            dietaryFiber: dvForm.dietaryFiber,
            protein: dvForm.protein,
            calcium: dvForm.calcium,
            iron: dvForm.iron,
        }
        axios.get("http://localhost:3001/api/food-logs/dailyvalues/exists/".concat(store.getState().app.username)).then((res0) => {
            if (res0.data.message) {
                axios.put("http://localhost:3001/api/food-logs/dailyvalue/", { data: dvData }).then((res) => {
                    calculateDvs();
                    setFormMessage("");
                    setShowdvmodal(false);
                    setDvForm({ calories: "2000", totalFat: "78", saturatedFat: "20", cholesterol: "300",sodium: "2300", totalCarbohydrate: 275,
                                           addedSugar: "50", dietaryFiber: "28", protein: "50", calcium: "1300", iron: "18"})
                    return;
                }).catch((err) => {
                    console.log(err.response.data.msg);
                    setFormMessage(err.response.data.msg);
                });
            }
            else {
                axios.post("http://localhost:3001/api/food-logs/dailyvalue", { data: dvData }).then((res) => {  
                    calculateDvs();
                    setFormMessage("");
                    setShowdvmodal(false);
                    setDvForm({ calories: "2000", totalFat: "78", saturatedFat: "20", cholesterol: "300",sodium: "2300", totalCarbohydrate: 275,
                                           addedSugar: "50", dietaryFiber: "28", protein: "50", calcium: "1300", iron: "18"})
                    return;
                }).catch((err) => {
                    console.log(err.response.data.msg);
                    setFormMessage(err.response.data.msg);
                });
            }
        }).catch((err) => {
            console.log(err.response.data.msg);
            setFormMessage(err.response.data.msg);
        });
    }

    function resetDVs() {
        const dvData = {
            username: store.getState().app.username,
            isDefault: true,
        }
        axios.get("http://localhost:3001/api/food-logs/dailyvalues/exists/".concat(store.getState().app.username)).then((res0) => {
            if (res0.data.message) {
                axios.put("http://localhost:3001/api/food-logs/dailyvalue/", { data: dvData }).then((res) => {
                    calculateDvs();
                    setFormMessage("");
                    setShowdvmodal(false);
                    setDvForm({ calories: "2000", totalFat: "78", saturatedFat: "20", cholesterol: "300",sodium: "2300", totalCarbohydrate: 275,
                                           addedSugar: "50", dietaryFiber: "28", protein: "50", calcium: "1300", iron: "18"})
                    return;
                }).catch((err) => {
                    console.log(err.response.data.msg);
                    setFormMessage(err.response.data.msg);
                });
            }
            else {
                axios.post("http://localhost:3001/api/food-logs/dailyvalue", { data: dvData }).then((res) => {  
                    calculateDvs();
                    setFormMessage("");
                    setShowdvmodal(false);
                    setDvForm({ calories: "2000", totalFat: "78", saturatedFat: "20", cholesterol: "300",sodium: "2300", totalCarbohydrate: 275,
                                           addedSugar: "50", dietaryFiber: "28", protein: "50", calcium: "1300", iron: "18"})
                    return;
                }).catch((err) => {
                    console.log(err.response.data.msg);
                    setFormMessage(err.response.data.msg);
                });
            }
        }).catch((err) => {
            console.log(err.response.data.msg);
            setFormMessage(err.response.data.msg);
        });
    }

    function OpenDVModal() {
        var space = " "
        if (hideDVs) {
            return (<div></div>);
        }
        return (
            <div>
                <Button variant="secondary" className="mb-2" onClick={handleOpenDVModal}>
                    Change Daily Values
                </Button>
                <Modal show={showdvmodal} onHide={handleCloseDVModal} animation={false} >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Daily Values</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Daily Values (DVs) are the recommended daily intake for important nutrients by the FDA. 
                        The DVs that the FDA suggests for the categories in this form are 2000 calories, 78g of total 
                        fat, 20g of saturated fat, 300mg of cholesterol, 2300mg of sodium, 275g of carbohydrates, 50g 
                        of added sugar, 28g of dietary fiber, 50g of protein, 1300mg of calcium, and 18mg of iron. These 
                        suggestions are subject to change and can be referenced{space}
                        <a href="https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels">
                            here
                        </a>
                        {space}for futher reading.</p>
                        <Form className="mx-1 justify-content-center" onSubmit={changeDVs} align="center" >
                            <Container className=" mt-4 mb-4  justify-content-center">
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="calories" >
                                    <Form.Label>Calories</Form.Label>
                                    <Form.Control type="calories" value={dvForm.calories} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="totalFat" >
                                    <Form.Label>Total Fat (g)</Form.Label>
                                    <Form.Control type="totalFat" value={dvForm.totalFat} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="saturatedFat" >
                                    <Form.Label>Saturated Fat (g)</Form.Label>
                                    <Form.Control type="saturatedFat" value={dvForm.saturatedFat} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="cholesterol" >
                                    <Form.Label>Cholesterol (mg)</Form.Label>
                                    <Form.Control type="cholesterol" value={dvForm.cholesterol} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="sodium" >
                                    <Form.Label>Sodium (mg)</Form.Label>
                                    <Form.Control type="sodium" value={dvForm.sodium} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="totalCarbohydrate" >
                                    <Form.Label>Total Carbohydrate (g)</Form.Label>
                                    <Form.Control type="totalCarbohydrate" value={dvForm.totalCarbohydrate} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="addedSugar" >
                                    <Form.Label>Added Sugar (g)</Form.Label>
                                    <Form.Control type="addedSugar" value={dvForm.addedSugar} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="dietaryFiber" >
                                    <Form.Label>Dietary Fiber (g)</Form.Label>
                                    <Form.Control type="dietaryFiber" value={dvForm.dietaryFiber} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="protein" >
                                    <Form.Label>Protein (g)</Form.Label>
                                    <Form.Control type="protein" value={dvForm.protein} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="calcium" >
                                    <Form.Label>Calcium (mg)</Form.Label>
                                    <Form.Control type="calcium" value={dvForm.calcium} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "16.5em" }} controlId="iron" >
                                    <Form.Label>Iron (mg)</Form.Label>
                                    <Form.Control type="iron" value={dvForm.iron} onChange={handleChange} />
                                </Form.Group>
                                <p>{formMessage}</p>
                            </Container>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={changeDVs}>
                            Submit Changes
                        </Button>
                        <Button variant="primary" onClick={resetDVs}>
                            Reset to Default
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDVModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    return (
        <Accordion.Item eventKey={props.index} id={props.id}>
            <Accordion.Header>
                <h5>
                    Meals for {props.day}{' '}
                    {!props.editable ? (
                        <></>
                    ) : submitted ? (
                        <Badge pill>
                            Submitted {mealListLength}{' '}
                            {mealListLength === 1 ? 'meal' : 'meals'}
                        </Badge>
                    ) : (
                        <Badge bg='secondary' pill>
                            Meals not saved
                        </Badge>
                    )}
                </h5>
            </Accordion.Header>
            <Accordion.Body>
                <Stack hidden={hideDVs} gap={4}>
                    <Container className="mb-3 d-flex justify-content-center bg-light border rounded"><Row className="mt-2">
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Calories: {dvSums.calories}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Total Fat: {dvSums.totalFat}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Saturated Fat: {dvSums.saturatedFat}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Cholesterol: {dvSums.cholesterol}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Sodium: {dvSums.sodium}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Total Carbs: {dvSums.totalCarbohydrate}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Added Sugar: {dvSums.addedSugar}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Dietary Fiber: {dvSums.dietaryFiber}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Protein: {dvSums.protein}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Calcium: {dvSums.calcium}% DV</p></Col>
                        <Col><p style={{ maxWidth: '145px', minWidth: '145px' }}>Iron: {dvSums.iron}% DV</p></Col>
                        <Col><OpenDVModal/></Col>
                    </Row></Container>
                </Stack>
                <Stack gap={4}>
                    {mealList.map((item, i) => (
                        <SchedulerMealIndividual
                            key={item.key}
                            mealData={item}
                            addFoodHandler={handleAddFoodToList}
                            removeFoodHandler={handleRemoveFoodFromList}
                            updateFoodHandler={handleUpdateFood}
                            updateMealHandler={handleUpdateMeal}
                            removeMealHandler={handleRemoveMeal}
                            setSubmitted={setSubmitted}
                            updateFinished={handleUpdateFinished}
                            finished={finishedArr[i]}
                            editable={props.editable}
                        />
                    ))}
                    {mealListLength === 0 ? (
                        <>
                            <h4 className='text-center'>No meals scheduled.</h4>
                            {!props.editable ? <></> : <AddMealButton />}
                        </>
                    ) : mealListLength < 3 ? (
                        <>
                            {!props.editable ? (
                                <></>
                            ) : (
                                <>
                                    <AddMealButton />
                                    <SubmitDayButton />
                                </>
                            )}
                        </>
                    ) : (
                        <>{!props.editable ? <></> : <SubmitDayButton />}</>
                    )}
                </Stack>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default SchedulerMealDay;
