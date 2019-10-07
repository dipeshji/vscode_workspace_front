const express = require('express')
const router = express.Router()
const history = require('../model/history')

var counter = 0
router.post('/routefida',(req,res) => {
    let query = {
        from:req.body.From,
        to:req.body.To
    }
    
    history.routedata(query,(err,data) =>{
        if(err){
            console.log("error" + "=>" + err);
            res.json(
               { msg:"Unable to fetch data! please check the date you have entered"}
            )
        }else if(data.length === 0){
            res.json({
                msg:"No Data present in this range of date! please recheck the dates"
            })
        }else
        {
            console.log(data.length);
            res.json(data)
        }
        

        
        
    })
    
})

module.exports = router