const express = require('express');
var db = require('../../module/db');
var health = require('../../module/health');
const router = express.Router();

router.post('/newCard', (req, res) => {
    health.vertifyCard(req.body, (err, r)=>{
        if(r.code && r.status) {
            db.add('card', req.body, (err, r) => {
                res.json(r);
            })
        }else{
            let uid = req.body.uid;
            let date = req.body.date;
            let where = {};
            where.uid = uid;
            where.date = date;
            db.modify('card', req.body, where, (err, r)=>{
                res.json(r);
            })
        }
    })
})

router.post('/newPlan', (req, res) => {
    let where = {};
    where.phone = req.body.phone;
    db.modify('user', req.body, where, (err, r) => {
        res.json(r);
    })
})

module.exports = router;