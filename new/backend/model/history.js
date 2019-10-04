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
const route_fida = mongoose.Schema({
    index:{
        type:Number
    },
    Filename:{
        type:String
    },
    Data:[data_schema]
},{ collection:"processed_route"})

// ====================================================================

const route_fidate = module.exports =mongoose.model("route_fidate",route_fida)


module.exports.routedata = (query,callback) => {
    console.log(query.from,query.to);
    
    route_fidate.find({TimeStamp: {
        $gte:  query.from,
        $lte:  query.to
    }})
    .exec(callback)
}