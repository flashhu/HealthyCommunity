const express = require('express');
var db = require('../module/db');
var health = require('../module/health');
const router = express.Router();

router.post('/newCard', (req, res) => {
    health.vertifyCard(req.body, (err, r1)=>{
        if(r1.code && r1.status) {
            db.add('card', req.body, (err, r) => {
                res.json(r);
            })
        }else{
            let uphone = req.body.uphone;
            let date = req.body.date;
            let where = {};
            where.uphone = uphone;
            where.date = date;
            db.modify('card', req.body, where, (err, r)=>{
                res.json(r);
            })
        }
    })
})

router.post('/newPlan', (req, res) => {
    let where = {};
    where.uphone = req.body.uphone;
    health.vertifyHabit(req.body, (err, r1) => {
        if(r1.status) { //已参与
            db.modify('health', req.body, where, (err, r) => {
                res.json(r);
            })
        }else {
            db.add('health', req.body, (err, r) => {
                res.json(r);
            })
        }
    })
})

router.get('/cardData/:phone', (req, res) => {
    let tempSql = `select date, temp from card where uphone = '${req.params.phone}' order by date`;
    let heartSql = `select date, heartrat from card where uphone = '${req.params.phone}' and heartrat order by date`;
    let bloodSql = `select date, blodpres_shrink, blodpres_relax from card where uphone = '${req.params.phone}' and blodpres_relax and blodpres_shrink order by date;`;
    db.querySQL(tempSql, (err, r1) => {
        if(r1.code === 1){
            db.querySQL(heartSql, (err, r2) => {
                if(r2.code === 1){
                    db.querySQL(bloodSql, (err, r3) => {
                        if(r3.code === 1) {
                            res.json({code:1, data:{tempList: r1.rows, heartList: r2.rows, bloodList: r3.rows}});
                        }else {
                            res.json(r3);
                        }
                    })
                }else {
                    res.json(r2);
                }
            })
        }else {
            res.json(r1);
        }
    })
})

router.get('/score/:phone', (req, res) => {
    let where = `where uphone='${req.params.phone}'`;
    db.select('card', where, `order by date desc`, `limit 1`, (err, r1) => {
        if(r1.code){
            db.select('health', where, '', '', (err, r2) => {
                let data = { status: r1.rows[0].status };
                if (r1.rows[0]) {
                    data['cardScore'] = r1.rows[0].score;
                }
                if (r2.rows[0]) {
                    data['habitScore'] = r2.rows[0].habitScore;
                }
                res.json({code: 1, msg:'数据获取成功！', data: data});
            })
        }else {
            res.json(r1);
        }
    })
})

module.exports = router;