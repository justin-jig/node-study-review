
const userModel = require('../models/user.model.js');

const getUsers = (req, res) => {

    res.render('users', {users: userModel.Users});
}

const createUser = (req, res) => {


    const num = userModel.Users.length + 1;
    userModel.Users.push({
        id : num,
        name : req.body.name,
        gender : req.body.gender,
        major : req.body.major
    });
    res.json({user: { id: num ,...req.body}});
}

module.exports = {
    getUsers,
    createUser
}