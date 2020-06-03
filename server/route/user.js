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

//我的
router.get('/memberData', (req, res) => {
    let sql = 'select * from user where type!= 0';
    db.select('user', '', '', '', (err, r1)=>{
        db.querySQL(sql, (err, r2)=>{
            if(r1.code && r2.code){
                res.status(200).json({code: 1, data: {userList: r1.rows, memberList: r2.rows}});
            }else{
                res.status(200).json({code: 0, msg: '数据获取失败！'});
            }
        })
    })
})

router.post('/updateMember', (req, res) => {
    let params = req.body;
    let sql = `update user set type=${params.type} where phone=${params.phone}`;
    db.querySQL(sql, (err, r) => {
        res.json(r);
    })
})

router.get('/deleteMember/:phone', (req, res) => {
    let sql = `update user set type=0 where phone=${req.params.phone}`;
    db.querySQL(sql, (err, r) => {
        res.json(r);
    })
})

module.exports = router;