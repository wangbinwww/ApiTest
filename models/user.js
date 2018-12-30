const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {
    ObjectID
} = require('mongodb');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                validator.isEmail(value)
            },
            message: '不是合法邮箱'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
    },
    time: {
        type: Date,
    },
    userID: {
        type: String,
        required: true,
        minlength: 8,

    },
    department: {
        type: String,
        required: true,
    },
    lineId: {
        type: String,
    },
    roleId: {
        type: String,
        required: true,
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }]


})

UserSchema.methods.generateToken = function() {
    var user = this;
    var access = user.roleId;
    //建立token
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    //
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token
    })

}

UserSchema.pre('save', function(next) {
        var user = this;
        if (user.isModified('password')) {
            bcrypt.hash(user.password, 10).then(hash => {
                user.password = hash;
                next();
            })

        } else {
            next();
        }
    })
    //把模型实例化道一个物件上
var User = mongoose.model('User', UserSchema);
module.exports = {
    User
}