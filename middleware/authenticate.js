var {
    User
} = require('./../models/user.js');

var authenticate = (req, res, next) => {
    var token = req.header('authToken');

}