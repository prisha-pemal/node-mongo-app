const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/save', async (req, res) => {

    try {

        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        await user.save();

        res.send("Data Saved Successfully");

    } catch(error) {

        res.status(500).send(error.message);

    }
});

module.exports = router;