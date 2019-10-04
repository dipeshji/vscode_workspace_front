const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// ===========================================================
const parsed_gps_data = Schema({
    Altitude:{
        type: String
    },
    Course:{
        type: String
    },
    Latitude:{
        type:String
    },
    Latitude_direction:{
        type: String
    },
    Longitude:{
        type: String
    },
    Longitude_direction:{
        type: String
    },
    Satellites:{
        type:String
    },
    Speed:{
        type:String
    },
    Timestamp:{
        type:String
    }
},{collection:'parsed_gps'})


// ===========================================================
const raw_data_schema = Schema({
    Timestamp:{
        type:String
    },
    Data:{
        type:String
    }
},{collection:'raw_gps'})
// ===========================================================



const parsed = module.exports = mongoose.model("parsed",parsed_gps_data)
const rawdata = module.exports = mongoose.model("rawdata",raw_data_schema)


module.exports.get_position = (callback)=>{
    rawdata.find({},null,{limit:10},callback)
    
}

module.exports.get_all_data = (callback)=>{
    position.find({},callback)
}


module.exports.download_signals=(callback)=>{
    rawdata.find({},callback)
}

module.exports.raw_data = (callback)=>{
    
    rawdata.find({},null,{limit:10})
    .sort({$natural:-1})
    .exec(callback)
}

module.exports.parsed_data = (callback)=>{
    parsed.find({},null,{limit:5})
    .sort({$natural:-1})
    .exec(callback)
}

