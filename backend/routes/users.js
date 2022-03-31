const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Food_Tag = require('../models/foodTagsModel')



// @route   GET api/users/:username
// @desc    Get single user item from collection.
// @access  Public
router.get('/dietary/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const restriction_ids = user.diets.concat(user.allergies);
        if (restriction_ids.length != 0) {
            const restrictions = await Food_Tag.find({
                '_id': { $in: user.diets.concat(user.allergies) }
            });
            if (!restrictions) res.status(400).json({ msg: 'Restrictions does not exist'});

    
            res.json({restrictions: restrictions,
                mealSwipes: user.mealSwipes
                })    
        }

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


module.exports = router
