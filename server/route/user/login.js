const express = require('express');
const router = express.Router();

// router.post('/',(req,res)=>{
//     console.log("hello")
// })

router.post('/login',(req,res)=>{
    // if(req.body.phone==='12345678901'){
    //     console.log(req.body.phone);
    // }
    let params = req.body;
    if(params.phone.length===11){
        res.status(200).json({code:1,data:{phone:params.phone,passwd:params.passwd,type:req.body.type},msg:'登录成功'})
    }else{
        res.status(200).json({code:0,data:null,msg:'登录失败'})
    }
    // res.json({phone:req.body.phone,password:req.body.passwd,remember:req.body.remember,type:req.body.type});
    
})
module.exports = router;