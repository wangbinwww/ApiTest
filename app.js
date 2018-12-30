const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const _ = require('lodash');
const mongoose = require('mongoose');
const {
    User
} = require('./models/user.js');

mongoose.connect('mongodb://localhost/APISystem', {
    useMongoClient: true
});



var app = express();
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'userID', 'department', 'lineId', 'roleId'])

    body.time = new Date().toString();
    var
})

app.listen(8700, () => {
    console.log(moment().tz("Asia/Taipei").format())
    console.log("监听端口3000！通过 http://localhost:8700/get 访问")
});

//接口1
//服务器端body输入
//http://localhost:3000/getg
app.get('/get', function(req, res) {
    res.status(200).json({
        message: 'hello world',
    });
})

//接口2
//服务器端body输入
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