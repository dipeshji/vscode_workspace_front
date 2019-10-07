const express = require('express')
const router = express.Router()
const currentroute = require("../model/currentroute")



// ==========================================================================

router.get('/routedata',(req,res) => {
    
    currentroute.routedata((err,data)=>{
        if(err)
        {
            console.log(err);
            
        }

        res.json(data)
    })
})

module.exports = router