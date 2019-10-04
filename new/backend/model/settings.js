const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let date = require('date-and-time');
var UTCstring = (new Date()).toUTCString();

console.log('UTCstring', UTCstring);

const settingsSchema = Schema({
    Primary_Details: {
        IMO:{
                type: Number,
                // required: true
            },
        Name:{
                type: String,
                // required: true
            },
        ECDIS_type:{
                        type: String,
                        // required: true        
                    },
        Retention_policy:{
                            type: String,
                            // required: true
                        },
        date:{
            
            type:Date,
            default: (new Date()).toUTCString()
        }
    }
},{collection:'primary_details'})


const settings = module.exports = mongoose.model("settings", settingsSchema);


module.exports.add_primary_details=(details,callback) => {
    settings.create(details,callback)
}