const crypto = require('crypto')
const mail_service = require('./mail')
const mongoose = require('mongoose')
const encrypt_data = require('../encrypt')
const Schema = mongoose.Schema;

const subscribe_schema = Schema({
    vessel_name:{
        type:String
    },
    service_name:{
        type:String
    },
    active_status:{
        type:Boolean
    },
    subscription_key:{
        type:String
    }
},{collection:'subscription_details'})

const subscribtion = module.exports = mongoose.model("subscribtion",subscribe_schema)
// =========================mail start======================================
module.exports.mail_send = (body,macAddress,callback)=>{
    console.log(body);
    const send_to = 'dpatidar336@gmail.com'

    let mail_body = {
        service1:body.servicename1,
        service2:body.servicename2,
        service3:body.servicename3,
        mac:macAddress,
        mail:body.vesselemail,
        vessel_name:body.vessel_name,
        IMO_number:body.IMOnumber
    }

    mail_service.send_mail(send_to,JSON.stringify(mail_body))
    .then(()=>{
        callback(true,null)
        // console.log("mail sent");
    })
    .catch((err)=>{
        callback(false,err)
        // console.log(err);
        
    })  
}
// ============================mail end===================================

// ============================subscription validation start==============
module.exports.validation = (body,macAddress,callback)=>{
    let subscribtion_failed = []
    let passed_subscription = []
    let already_subscribed = []
    let count = 0
    let entry_count = 0
    let values = Object.values(body)
    values.forEach(entery=>{
        if(entery !== null){
            count++
        }
    })
        
    
    Object.entries(body).forEach(entry => {
        let service = entry[0];
        let sub_key = entry[1];
        // console.log(service + ":" + sub_key);
        if(sub_key !== null){
            let password = service+macAddress
            let hash = crypto.createHash('sha256')
            .update(password)
            .digest('hex')
            
            if(hash===sub_key){
                let data = {
                    vessel_name:body.vessel_name,
                    service_name:service,
                    active_status:true,
                    subscription_key:sub_key
                }
                subscribtion.findOne({service_name:service},(err,res)=>{
                    if(err) throw err
                    if(res !== null){
                        if(res.active_status){
                            already_subscribed.push(service)
                            entry_count++
                            if(entry_count === count){
                                callback(subscribtion_failed,passed_subscription,already_subscribed)
                            }
                        }else{
                            subscribtion.findOneAndUpdate({service_name:service},{$set:{active_status:true}}, {new:true}, (err,doc)=>{
                                if(err){
                                    entry_count ++
                                    subscribtion_failed.push(service)
                                    if(entry_count === count)
                                        callback(subscribtion_failed,passed_subscription,already_subscribed)
                                }else{
                                    entry_count++
                                    passed_subscription.push(service)
                                    if(entry_count === count)
                                        callback(subscribtion_failed,passed_subscription,already_subscribed)
                                }
                            })
                        }
                    }
                    else if(res === null){
                        
                        subscribtion.create(data,(err,value)=>{
                            if(err) throw err
                            else
                            {
                                entry_count++
                                passed_subscription.push(service)
                                if(entry_count === count)
                                    callback(subscribtion_failed,passed_subscription,already_subscribed)
                            }  
                        })
                    }   
                })
            }else
            {
               subscribtion.findOne({service_name:service},(err,res)=>{
                    if(err) throw err
                    else if(res){
                        already_subscribed.push(service)
                        entry_count++
                        if(entry_count === count){
                            callback(subscribtion_failed,passed_subscription,already_subscribed)
                        }
                    }else if(res === null){
                        subscribtion_failed.push(service)
                        entry_count++ 
                        if(entry_count === count){
                            callback(subscribtion_failed,passed_subscription,already_subscribed)
                        }
                    }
                })
            }
        }
    });
}
// ============================subscription validation end==============

// ===========================subscribed services start=================
module.exports.subscribed_services = (callback) => {
    let subscribed_services = []
    subscribtion.find({},(err,service) => {
        if(err) throw err
        else
        {
            service.forEach((service)=>{
                subscribed_services.push(service.service_name)
            })
            callback(subscribed_services)
        }
    })
}
// ===========================subscribed services end=================

// ===========================manuall subscription start===============

module.exports.manual_subscription = (body,macAddress,callback) => {
    let data = {
        service1:body.servicename1,
        service2:body.servicename2,
        service3:body.servicename3,
        mac:macAddress,
        mail:body.vesselemail,
        vessel_name:body.vessel_name,
        IMO_number:body.IMOnumber
    }
    const filename = body.IMOnumber + " " + new Date() + ".enc";  
    // console.log(filename);
    encrypt_data({data:JSON.stringify(data), password:"$navi@navi*navi#navi%navi&navi",filename:filename})
    callback(filename)
}
// ===========================manuall subscription end===============