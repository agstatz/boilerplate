const express = require('express')
const { db } = require('../models/mealPlanModel')
const router = express.Router()

const Meal_Plan = require('../models/mealPlanModel')

// @route   GET api/meal-plans
// @desc    Get all meal-plans from collection
// @access  Public
router.get('/', async (req, res) => {
    try {
        console.log(db.collection("meal_plans").find({}));
        const mealplans = await Meal_Plan.find(); // Get all foods
        console.log(mealplans);
        res.json(mealplans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/meal-plans
// @desc    set a new meal-plan
// @access  Public
router.post('/', async (req, res) => {
    try {
        const meal_plan = new Meal_Plan({
            name: req.body.name,
            private: req.body.private,
            owner: req.body.owner,
            likes: req.body.likes,
            meals: []
        })
        meal_plan.save((err, user) => {
            if (err) {
                console.error(err.message);
                res.status(500).send({ message: err});
            }
            res.send({ message: "Updated successfully."});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/foods/:id
// @desc    Get single food item from collection.
// @access  Public
/*router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) return res.status(400).json({ msg: 'Food item does not exist'});

        res.json(food);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})*/

module.exports = router
