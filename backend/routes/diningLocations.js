const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

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
        const dining_location = await Dining_Location.findOne({ name: req.params.name });

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
    try {
        const dining_location = new Dining_Location({
            name: req.body.data.locationName,
            xLocation: req.body.data.xPos,
            yLocation: req.body.data.yPos,
            courseScheduleId: mongoose.Types.ObjectId(req.body.data.courseScheduleId),
            courses: [],
            comments: [],
            hidden: req.body.data.hidden,
            occupancy: 0
        })
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
                name: req.body.data.locationName,
                xLocation: req.body.data.xPos,
                yLocation: req.body.data.yPos,
                hidden: req.body.data.hidden,
                courseScheduleId: mongoose.Types.ObjectId(req.body.data.courseScheduleId),
                //courses: req.body.courses
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

// @route   DELETE /api/dining-locations/:name
// @desc    Delete a specific dining location via name
// @access  Public
router.delete('/:name', async (req, res) => {
    try {
        const dining_location = await Dining_Location.deleteOne({ name: req.params.name });
        console.log("here");
        if (!dining_location) return res.status(400).json({ msg: 'delete successful'});
        res.send({ message: "Deleted successfully."});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router