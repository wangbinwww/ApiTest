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
    }
})