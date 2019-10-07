const express = require('express')
const router = express.Router()
const settings = require('../model/settings')


router.post('/add',(req,res) => {
    console.log(req.body);
    
    settings.add_primary_details(req.body,(err)=>{
        if(err)
        {
            console.log(err);
            
            res.json({
                status:false,
                msg:"Something went wrong! please try again"
            })
        }
        else
        {
            res.json({
                status:true,
                msg:"Successful"
            })
        }
    })
})


module.exports = router