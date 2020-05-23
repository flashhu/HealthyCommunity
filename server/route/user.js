const express = require('express');
const Core = require('@alicloud/pop-core');
var db = require('../module/db');
var user = require('../module/user');
const { genPassword } = require('../module/crypto');
const router = express.Router();

router.post('/login', (req, res) => {
    let params = req.body;
    user.verifyPwd(params, (err, r) => {
        res.status(200).json(r);
    })
})

router.post('/register', (req, res) => {
    let params = req.body;
    if(params.match){
        password = genPassword(params.passwd)
        params = {name: params.name, phone: params.phone, address: params.address, passwd: password, name: params.name, type: params.type}
        user.addUser(params, (err, r) => {
            res.status(200).json(r);
        })
    }else{
        res.status(200).json({ code: 0, data: null, msg: '验证码错误！'})
    }
   
})

router.post('/validate', (req, res) => {
    let params = req.body;
    user.verifyPhone(params, (err, r) => {
        res.status(200).json(r)
    })

})
module.exports = router;