const express = require('express');
var db = require('../module/db');
var user = require('../module/user');
const config = require('../module/config');
const { genPassword } = require('../util/crypto');
const router = express.Router();

var client = config.client;
var argum = config.argum;
var requestOption = config.requestOption;

router.post('/valAuth', (req, res) => {
    let params = req.body;
    let captcha = sendMsg(params);
    res.status(200).json({ code: 1, data: params.phone, msg: '已发送', captcha });
})

router.post('/valCaptcha', (req, res) => {
    let params = req.body;
    let isMatch = params.isMatch;
    if (isMatch) {
        res.status(200).json({ code: 1 })
    } else {
        res.status(200).json({ code: 0, msg: '验证码输入错误！' });
    }
})
router.post('/updatePhone', (req, res) => {
    let params = req.body;
    if (params.isMatch) {
        let sql = `update user set phone=${params.newphone} where phone=${params.oldphone}`;
        db.querySQL(sql, (err, r) => {
            res.status(200).json({ code: 1, phone: params.newphone, msg: '已更新' })
        })
    } else {
        res.status(200).json({ code: 0, msg: '验证码输入错误' });
    }

})
router.post('/updatePwd', (req, res) => {
    let params = req.body;
    let pwd = genPassword(params.pwd);
    let sql = `update user set passwd="${pwd}" where id=${params.id}`;
    db.querySQL(sql, (err, r) => {
        res.status(200).json({ code: 1, msg: '已更新' });
    })
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