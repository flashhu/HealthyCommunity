const express = require('express');
var db = require('../module/db');
var user = require('../module/user');
const config = require('../module/config');
const router = express.Router();

var client = config.client;
var argum = config.argum;
var requestOption = config.requestOption;

router.post('/valAuth', (req, res) => {
    let params = req.body;
    let captcha = sendMsg(params);
    res.status(200).json({code:1,data:params.phone,msg:'已发送',captcha});
})

var sendMsg = (params) => {
    argum.PhoneNumbers = params.phone
    captcha = JSON.parse(argum.TemplateParam)
    captcha.code = Math.random().toFixed(6).slice(-6)
    argum.TemplateParam = JSON.stringify(captcha);
    // client.request('SendSms', argum, requestOption).then((result) => {
    //     console.log(JSON.stringify(result));
    // }, (ex) => {
    //     console.log(ex);
    // })
    return captcha.code;
}
module.exports = router