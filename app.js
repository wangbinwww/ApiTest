const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const _ = require('lodash');
const mongoose = require('mongoose');
const {
    User
} = require('./models/user.js');

mongoose.connect('mongodb://localhost:27017/APISystem', {
    useNewUrlParser: true,
    autoIndex: false
});



var app = express();
app.use(bodyParser.json());

//注册
app.post('/signup', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'userID', 'department', 'lineID', 'roleID']);
    body.time = Date.now();
    var user = new User(body);
    user.save().then(() => {
        //return user.generateToken();
        user.generateToken();
    }).then((token) => {
        res.header('authToken', token).send({
            "注册用户名:": user.name,
            "注册信息": "注册成功！"
        });
    }).catch((error) => {
        res.status(400).send(error);
    });
})

//登录
app.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateToken().then((token) => {
            res.header('authTonen', token).send({
                "用户名:": user.name,
                "登录状态": "登录成功！"
            })
        }).catch((e) => {
            res.status(403).send("未知错误！" + e);
        })
    }).catch((e) => {
        res.status(403).send({
            "登录状态": "密码错误！"
        });
    })
})

app.listen(8700, () => {
    //console.log("启动时间：")
    //console.log(moment().tz("Asia/China").format())
    console.log("监听端口8700！通过 http://localhost:8700/get 访问")
});

//接口1
//http://localhost:3000/getg
app.get('/get', function(req, res) {
    res.status(200).json({
        message: '服务器启动状态！',
    });
})

//接口2
//body输入
//http://localhost:3000/post
// {
//     "name":"abc",
//     "pass":"123"
// }
app.post('/post', function(req, res) {
    const person = {
        name: req.body.name,
        age: req.body.pass,
    }
    res.status(200).json({
        getPerson: person,
        message: '校验密码通过！',
    });
});