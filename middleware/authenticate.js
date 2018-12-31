var {
    User
} = require('./../models/user.js');

var authenticate = (req, res, next) => {
    var token = req.header('authToken');
    User.findByToken(token).then(user => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(403).send();
    })
}

module.exports = {
    authenticate
}