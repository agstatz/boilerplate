const express = require('express')
const router = express.Router()

const Dining_Location = require('../models/DiningLocation')

// @route   GET /api/dining-locations
// @desc    Get all dining-locations from collection
// @access  Public
router.get('/', async (req, res) => {
    try {
        const diningLocations = await Dining_Location.find(); // Get all foods
        res.json(diningLocations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET /api/dining-locations/:name
// @desc    Get a specific dining location via name
// @access  Public
router.get('/:name', async (req, res) => {
    try {
        const dining_location = await Dining_Location.findOne({ name: req.params.name});

        if (!dining_location) return res.status(400).json({ msg: 'Dining Location does not exist'});

        res.json(dining_location);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   POST /api/dining-locations
// @desc    set a new dining location
// @access  Public
router.post('/', async (req, res) => {
    console.log('got:\n')
    console.log(req.body)
    try {
        const dining_location = new Dining_Location({
            name: req.body.name,
            xLocation: req.body.xLocation,
            yLocation: req.body.yLocation,
            courseSchedule: req.body.courseSchedule,
            courses: req.body.courses
        })
        dining_location.save((err, user) => {
            if (err) {
                console.error(err.message);
                res.status(500).send({ message: err});
            }
            res.send({ message: "Updated successfully."});
            console.log('saved')
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   PUT /api/dining-locations/:name
// @desc    update an existing dining location by name
// @access  Public
router.put('/:name', async (req, res) => {
    try {
        const dining_location = await Dining_Location.findOne({name: req.params.name});
        if (!dining_location) return res.status(400).json({ msg: 'Dining Location does not exist'});

        const filter = { name: req.params.name };

        const updateDoc = {
            $set: {
                name: req.body.name,
                xLocation: req.body.xLocation,
                yLocation: req.body.yLocation,
                courseSchedule: req.body.courseSchedule,
                courses: req.body.courses
            }
        };

        const result = await Dining_Location.updateOne(filter, updateDoc);

        dining_location.save((err, user) => {
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