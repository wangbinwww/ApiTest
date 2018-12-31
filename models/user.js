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
        validator: {
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
    lineID: {
        type: String,
    },
    roleID: {
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

//token生成
UserSchema.methods.generateToken = function() {
    var user = this;
    var access = user.roleID;
    //建立token
    try {
        var token = jwt.sign({
            _id: user._id.toHexString(),
            access
        }, 'abc123').toString();
    } catch (err) {
        console.log('token错误：', err)
    }
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token
    })

}

//登录
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({
        email
    }).then(user => {
        if (!email) {
            return Promise.reject('没有这个注册用户！');
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password).then(res => {
                if (res) {
                    resolve(user)
                } else {
                    reject('密码错误！')
                }
            })
        })
    })
}

//验证token
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    try {
        decode = jwt.verify(token, 'abc123')
    } catch (e) {
        return Promise.reject();
    }
}

//注册
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