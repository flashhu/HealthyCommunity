const express = require('express');
var db = require('../module/db');
// var health = require('../module/notice');
const router = express.Router();

router.get('/noticeData', (req, res) => {
    db.selectAll('notice', (er, r) => {
        res.json(r);
    })
})

router.post('/search', (req, res) => {
    let sql = `select *
               from notice
               where title like '%${req.body.title}%'`;
    db.querySQL(sql, (err, r) => {
        res.json(r);
    })
})

router.get('/deleteNotice/:id', (req, res) => {
    // console.log(typeof(req.params.title));
    let where = { id : parseInt(req.params.id) };
    db.del('notice', where, (err, r) => {
        res.json(r);
    })
})

module.exports = router;