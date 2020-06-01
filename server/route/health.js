const express = require('express');
var db = require('../module/db');
var health = require('../module/health');
const router = express.Router();

//普通用户
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

router.post('/healthStatus', (req, res) => {
    let sql = `update health 
                set tempStatus=${req.body.tempStatus}, latestCard='${req.body.latestCard}'
                where uphone=${req.body.uphone}`;
    db.querySQL(sql, (err, r) => {
        res.json(r);
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
    db.select('card', where, `order by date desc`, '', (err, r1) => {
        if(r1.code){
            db.select('health', where, '', '', (err, r2) => {
                if(r1.rows.length > 0 || r2.rows.length > 0) {
                    let data = { status: '6' };
                    if (r1.rows[0]) {
                        data['cardScore'] = r1.rows[0].score;
                        data['status'] = r1.rows[0].status;
                    }
                    if (r2.rows[0]) {
                        data['habitScore'] = r2.rows[0].habitScore;
                        data['dailyIngest'] = r2.rows[0].dailyIngest;
                        data['cardNum'] = r2.rows[0].cardNum;
                        data['cardDate'] = r2.rows[0].cardDate;
                    }
                    res.json({ code: 1, msg: '数据获取成功！', status: true, data: data });
                }else{
                    res.json({ code: 1, msg: '数据暂未录入！', status: false})
                }
            })
        }else {
            res.json(r1);
        }
    })
})

router.get('/sports', (req, res)=> {
    const len = 3;
    let index = Array(20).fill(1).map((v, i) => i + 1);
    const num = index.map((n, i, all) => {
                  const j = i + Math.floor(Math.random() * (all.length - i));
                  const v = all[j];
                  all[j] = n;
                  return v;
              }).slice(0, len);
    let sql = `select * from sports WHERE id = ${num[0]} or id = ${num[1]} or id = ${num[2]}`
    db.querySQL(sql, (err, r)=>{
        res.json(r);
    })
})

router.post('/foods', (req, res)=> {
    let params = req.body;
    let scale = params.scale.split('|').map(Number);
    let staple = params.ingest * scale[0];
    let meat = params.ingest * scale[1]; 
    let vegetable = params.vege;
    let sql1 = `select * from foods where calorie <= ${staple} and type = '0'`;
    let sql2 = `select * from foods where calorie <= ${meat} and type = '1'`;
    let sql3 = `select * from foods where calorie <= ${vegetable} and type = '2'`;
    db.querySQL(sql1, (err, r1) => {
        if(r1.code){
            db.querySQL(sql2, (err, r2) => {
                if(r2.code){
                    db.querySQL(sql3, (err, r3) => {
                        if(r3.code) {
                            res.json({ code: 1, data: {staple: r1.rows, meat: r2.rows, vegetable: r3.rows}})
                        }else{
                            res.json(r3)
                        }
                    })
                }else{
                    res.json(r2)
                }
            })
        }else{
            res.json(r1)
        }
    })
})

router.post('/habitCard', (req, res) => {
    let where = { uphone: req.body.uphone}
    db.modify('health', req.body, where, (err, r)=>{
        res.json(r);
    })
})


//管理端
router.post('/dataList', (req, res) => {
    let type = parseInt(req.body.type);
    let sql = '';
    if(type === 2){ // 所有状态
        sql = `select name, phone, address, tempStatus, latestCard
               from user, health
               where phone = uphone`;
    } else if (type === 1) { //已打卡
        sql = `select name, phone, address, tempStatus, latestCard
               from user, health
               where phone = uphone and latestCard='${req.body.date}'`;
    } else { //未打卡
        sql = `select name, phone, address, tempStatus, latestCard
               from user, health
               where phone = uphone and latestCard!='${req.body.date}'`;
    }
    db.querySQL(sql, (err, r)=>{
        res.json(r);
    })
})

router.post('/search', (req, res) => {
    let sql = '';
    if (req.body.type === 2) { // 所有状态
        sql = `select name, phone, address, tempStatus, latestCard
               from user, health
               where phone = uphone and name='${req.body.name}'`;
    } else if (req.body.type === 1) { //已打卡
        sql = `select name, phone, address, tempStatus, latestCard
               from user, health
               where phone = uphone and name='${req.body.name}' and latestCard='${req.body.date}'`;
    } else { //未打卡
        sql = `select name, phone, address, tempStatus, latestCard
               from user, health
               where phone = uphone and name='${req.body.name}' and latestCard!='${req.body.date}'`;
    }
    db.querySQL(sql, (err, r) => {
        res.json(r);
    })
})

router.get('/chartData', (req, res)=>{
    let sql1 = `select latestCard, count(uphone) as num
                from health h
                group by latestCard
                order by latestCard desc`;
    let sql2 = `select tempStatus, count(uphone) as num
                from health h
                group by tempStatus
                order by tempStatus`;
    db.querySQL(sql1, (err, r1)=>{
        if(r1.code){
            db.querySQL(sql2, (err, r2)=>{
                if(r2.code){
                    res.json({ code: 1, data: { completion: r1.rows, tempNormal: r2.rows}});
                }else{
                    res.json(r2);
                }
            })
        }else{
            res.json(r1);
        }
    })
})

module.exports = router;