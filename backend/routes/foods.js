const express = require('express')
const router = express.Router()

const Food = require('../models/Food')

// @route   GET api/foods
// @desc    Get all food items from collection.
// @access  Public
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find(); // Get all foods
        res.json(foods);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/foods/:id
// @desc    Get single food item from collection.
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) return res.status(400).json({ msg: 'Food item does not exist'});

        res.json(food);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router
