const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const _ = require('lodash');
const mongoose = require('mongoose');
const {
    User
} = require('./models/user.js');

//mongoose.Promise = global.process;
mongoose.connect('mongodb://localhost:27017/APISystem', {
    //useMongoClient: true
});



var app = express();
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'userID', 'department', 'lineID', 'roleID'])
    body.time = Date.now();
    var user = new User(body);
    user.save().then(() => {
        user.generateToken();
    }).then((token) => {
        res.header('authToken', token).send(user.name);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.listen(8700, () => {
    console.log("启动时间：")
    console.log(moment().tz("Asia/China").format())
    console.log("监听端口8700！通过 http://localhost:8700/get 访问")
});

//接口1
//http://localhost:3000/getg
app.get('/get', function(req, res) {
    res.status(200).json({
        message: 'hello world',
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
        message: 'Pass OK',
    });
});