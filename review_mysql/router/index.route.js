const express = require('express');
const userRoute = require('./user.route.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

userRoute(router);

module.exports = router;