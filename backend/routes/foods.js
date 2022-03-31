const express = require('express')
const router = express.Router()
const Food = require('../models/Food')
const Food_Tag = require('../models/foodTagsModel')

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

router.get("/restrictions/:restrictions", async (req, res) => {
    console.log('here')
    console.log(req.params.restrictions);
    const restrictions = req.params.restrictions.split(",");
    console.log(restrictions);
    try {
        const foods = await Food_Tag.find({
            "_id": { $in: req.params.restrictions }
        });
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

// @route   GET api/foods/getfoodtags/:name
// @desc    Get food tags from the foods collection from the food with the given name.
// @access  Public
router.get("/getfoodtags/:name", async (req, res) => {
    try {

        const food = await Food.findOne({ name: req.params.name });

        if (!food) return res.status(400).json({ msg: 'Food item does not exist'});
        console.log(food);
        return res.json(food.foodTags);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/foods/searchusertag/:name
// @desc    Get food tags from the food tag collection matching the given name.
// @access  Public
router.get("/searchusertag/:name", async (req, res) => {
    try {
        const food_tag = await Food_Tag.find({ name: req.params.name });

        if (!food_tag) return res.status(400).json({ msg: 'Food item does not exist'});

        res.json(food_tag);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/foods/searchtags/:name
// @desc    Get user-created food tags from the food tag collection matching the given name.
// @access  Public
router.get("/searchtags/:name", async (req, res) => {
    try {
        const food_tag = await Food_Tag.find({ name: req.params.name, tagType: "user-created" });

        if (!food_tag) return res.status(400).json({ msg: 'Food item does not exist'});

        res.json(food_tag);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router
