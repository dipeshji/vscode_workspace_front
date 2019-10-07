const express = require('express')
const router = express.Router()
const subscription = require('../model/subscribe')
const path = require('path')
const fs = require('fs')



router.post('/submit',(req,res)=>{
    if(req.body.subscription_process === "Online"){
        require('getmac').getMac({iface: 'enp2s0'},(err,macAddress)=>{
            subscription.mail_send(req.body,macAddress,(sent,err)=>{
                if(sent){
                    console.log("sent");
                        
                    res.json({
                        status:true,
                        msg:"Successfully Submitted"
                    })
                }else if(err){
                    res.json({
                        status:false,
                        msg:"Something went wrong, please check your network connection."
                    })
                }
            })
        })
    }else{
        require('getmac').getMac({iface: 'enp2s0'},(err,macAddress)=>{
            subscription.manual_subscription(req.body,macAddress,(filename)=>{
                res.setHeader("Content-Disposition","attachment; filename=" + filename)
                filename = path.join(__dirname, "../" + filename)
                res.sendFile(filename,(err)=>{
                    if(err) console.error(err + "File not sent")
                    else fs.unlinkSync(filename)
                })
            })
        })
    }
})


router.post('/keys/subscribe',(req,res)=>{
    require('getmac').getMac(function(err, macAddress){
        if (err)  throw err
        subscription.validation(req.body,macAddress,(failed_subscription,passed_subscription,already_subscribed)=>{
            failed_subscription.splice(0,1)
            if(passed_subscription.length || failed_subscription.length || already_subscribed.length >= 1)
                {
                    JSON.stringify(passed_subscription)
                    JSON.stringify(failed_subscription)
                    JSON.stringify(already_subscribed)
                    res.json({
                        status:true,
                        passed_subscriptions:passed_subscription,
                        failed_subscriptions:failed_subscription,
                        already_subscribed:already_subscribed
                    })
                } 
        })
    })
})


router.get('/subscribed/services',(req,res)=>{
    subscription.subscribed_services((subscribed_services) => {
        JSON.stringify(subscribed_services)
        res.json({
            subscribed_services:subscribed_services
        })
    })

})

module.exports = router