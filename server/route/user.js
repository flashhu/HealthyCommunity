const express = require('express');
var db = require('../module/db');
var user = require('../module/user');
const router = express.Router();

// router.post('/',(req,res)=>{
//     console.log("hello")
// })

router.post('/login', (req, res) => {
    let params = req.body;
    user.verifyPwd(params, (err, r) => {

        res.status(200).json(r);
    })
})
module.exports = router;