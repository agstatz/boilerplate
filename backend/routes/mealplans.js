const express = require('express')
const router = express.Router()

const Meal_Plan = require('../models/mealPlanModel')

// @route   GET api/meal-plans
// @desc    Get all meal-plans from collection
// @access  Public
router.get('/', async (req, res) => {
    try {
        const mealplans = await Meal_Plan.find(); // Get all foods
        res.json(mealplans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/meal-plans/:id
// @desc    Get a specific meal plan via id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const mealplan = await Meal_Plan.findById(req.params.id);

        if (!mealplan) return res.status(400).json({ msg: 'Meal Plan does not exist'});

        res.json(mealplan);

    } catch(err) {
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

// @route   PUT api/meal-plans/:id
// @desc    update an existing meal plan by id
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const mealplan = await Meal_Plan.findById(req.params.id);
        if (!mealplan) return res.status(400).json({ msg: 'Meal Plan does not exist'});

        console.log(req.body);

        const filter = { _id: req.params.id };

        const updateDoc = {
            $set: {
                name: req.body.name,
                private: req.body.private,
                owner: req.body.owner,
                likes: req.body.likes,
                meals: []
            }
        };
        
        const result = await Meal_Plan.updateOne(filter, updateDoc);

        mealplan.save((err, user) => {
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

module.exports = router
