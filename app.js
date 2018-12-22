const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');

var app = express();
app.use(bodyParser.json());

//服务器端body输入
//http://localhost:3000/getg
app.get('/get', function(req, res) {
    res.status(200).json({
        message: 'hello world',
    });
})

app.listen(3000, () => {
    console.log(moment().tz("Asia/Taipei").format())
    console.log("监听端口3000！通过http://localhost:3000访问")
});

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