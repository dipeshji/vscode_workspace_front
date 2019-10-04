const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// ===========================================================
const data_schema = mongoose.Schema({
    RudderAngle:{
        type:String
    },
    TurnRadius:{
        type:String
    },
    PortXTE:{
        type:String
    },
    LegType:{
        type:String
    },
    Lon:{
        type:String
    },
    StbXTE:{
        type:String
    },
    WPName:{
        type:String
    },
    Lat:{
        type:String
    },
    Id:{
        type:String
    },
    ArrivalC:{
        type:String
    },
    TurnRate:{
        type:String
    }
})
// ===========================================================
const route_data = mongoose.Schema({
    index:{
        type:Number
    },
    Filename:{
        type:String
    },
    Data:[data_schema]
},{ collection:"processed_route"})

// ====================================================================


const route = module.exports =mongoose.model("route",route_data)


module.exports.routedata = (callback) => {
    route.find({},null,{limit:1})
    .sort('-index')
    .exec(callback)
}