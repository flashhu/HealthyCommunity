const express = require('express');
var db = require('../module/db');
const router = express.Router();

router.get('/goods', (req, res) => {
    let sql1 = `select name, sale, price, url, type, unit from goods where type = 0`;
    let sql2 = `select name, sale, price, url, type, unit from goods where type = 1`;
    let sql3 = `select name, sale, price, url, type, unit from goods where type = 2`;

    db.querySQL(sql1, (err, r1) => {
        if (r1.code) {
            db.querySQL(sql2, (err, r2) => {
                if (r2.code) {
                    db.querySQL(sql3, (err, r3) => {
                        if (r3.code) {
                            res.json({ code: 1, data: { main: r1.rows, mmne: r2.rows, vegetables: r3.rows } })
                        } else {
                            res.json(r3)
                        }
                    })
                } else {
                    res.json(r2)
                }
            })
        } else {
            res.json(r1)
        }
    })
})

router.post('/submitOrder', (req, res) => {
    let params  = req.body;
    db.add('orders',params,(err,r)=>{
        res.status(200).json(r);
    })
})

module.exports = router;