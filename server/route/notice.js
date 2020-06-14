const express = require('express');
var db = require('../module/db');
const router = express.Router();

router.get('/noticeData', (req, res) => {
    let sql = `select * from notice order by time desc`;
    db.querySQL(sql, (er, r) => {
        res.json(r);
    })
})

router.post('/search', (req, res) => {
    let sql = `select *
               from notice
               where title like '%${req.body.title}%' order by time desc`;
    db.querySQL(sql, (err, r) => {
        res.json(r);
    })
})

router.get('/deleteNotice/:id', (req, res) => {
    let where = { id : parseInt(req.params.id) };
    db.del('notice', where, (err, r) => {
        res.json(r);
    })
})

router.post('/addNotice', (req, res) => {
    db.add('notice', req.body, (err, r)=>{
        res.json(r);
    })
})

router.get('/detail/:id', (req, res) => {
    let where = `where id = ${req.params.id}`
    db.select('notice', where, '', '', (err, r) => {
        res.json(r);
    })
})

module.exports = router;