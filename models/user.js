const mongoost = require('mongoose');
const validator = require('validator');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {
    ObjectID
} = require('mongodb');

var UserSchema = new mongoost.Schema({
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
            message: 'value不是合法邮箱'
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
        acess: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }]


})