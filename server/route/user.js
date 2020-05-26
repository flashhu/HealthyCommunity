const express = require('express');
var db = require('../module/db');
var user = require('../module/user');
const { genPassword } = require('../util/crypto');
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
        params = {name: params.name, phone: params.phone, address: params.address, passwd: password, type: params.type}
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