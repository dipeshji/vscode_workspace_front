const express = require('express')
const router = express.Router()
const position = require('../model/position')



var to_send_raw_data = []
var counter = 0

// ==================================================================
router.get('/',(req,res)=>{
    
    position.get_position((err,positions)=>{
        if(err)
            res.send({"status":false,
        "msg":"Data not received"})
        res.send(positions)
    })
})

// ===================================================================

router.get('/all_data',(req,res)=>{
    
    
    position.get_all_data((err,positions)=>{
        if(err)
        {
            res.send({"status":false,
            "msg":"No data to show"})
        }
        res.send(positions)
            
    })
    
})

// ===================================================================

router.get('/rawdat',(req,res)=>{
	counter++
    position.raw_data((err,rawdata)=>{
        if(err)
        {
            res.json({
                "status":false,
                "msg":"Unable to fatch data"
            })   
        }

        rawdata.forEach(element => {
            to_send_raw_data.push({
                data:element.Data,
                timestamp:element.Timestamp
            })
            
        });    
        res.json(to_send_raw_data)
	if(counter==5)
	{
        to_send_raw_data = []
        console.log("data cleared");
        console.log(to_send_raw_data);
        console.log(counter);
        
        
	}
})
})

// ===================================================================

router.get('/downloadsignals',(req,res)=>{
    console.log("download received");
    
    res.sendFile('/home/navidium/incoming/NMEA_signal.csv')
})

// ===================================================================

router.get('/downloadrawsignals',(req,res)=>{
    console.log("download received");
    
    res.sendFile('/home/navidium/Dipesh/dipesh/Project/backend/routes/data.bin')
})

// ===================================================================

router.get('/parseddat',(req,res)=>{
    var to_send_parsed_data = []
    position.parsed_data((err,parsed_data)=>{
        if(err){
            res.json({
                "status":false,
                "msg":"Unable to get Parsed data"
            })
        }
        
        
        parsed_data.forEach(element => {
            
            to_send_parsed_data.push({
                // altitude: element.Altitude,
                // course: element.Course,
                latitude: element.Latitude,
                longitude: element.Longitude,
                // longitude_direction: element.Longitude_direction,
                // satellites: element.Satellites,
                speed: element.Speed,
                timestamp: element.Timestamp
            })

        })
        res.json(to_send_parsed_data)
    })
})

module.exports = router
