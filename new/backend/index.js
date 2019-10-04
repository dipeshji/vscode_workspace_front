const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const mongo_file = require('./utils/utils')
const server  = require('http').createServer(app);
const io      = require('socket.io').listen(server);
// require('mongoose').set('debug',true)
const host = "localhost"



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors({
    exposedHeaders:['Content-disposition']
}))
app.use(express.static(path.join(__dirname + '/public')))


//==================database_connection=====================
mongoose.set('useCreateIndex', true)
console.log(mongo_file.mongoDB);

mongoose.connect(mongo_file.mongoDB, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + mongo_file.mongoDB);
});
mongoose.connection.on('error', () => {
    console.log('Data Base Connection error');
});

//==================database_connection_end=====================

const port = process.env.PORT || 3000;

//=======================Routes============================

var settings = require('./routes/settings')
var position = require('./routes/position')
var currentroute = require('./routes/currentroute')
var history = require('./routes/history')
var subscibe = require('./routes/subscribe')

app.use('/settings',settings)
app.use('/position',position)
app.use('/currentroute',currentroute)
app.use('/history', history)
app.use('/subscribe',subscibe)

//=======================Routes End============================


//==================default_path===============================
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.send("documents")
})

//==================default_path_end===============================

//==================web_server===============================

server.listen(port,host, (err) => {
    if(err)
    console.error(err)
    else
    console.log(`server running on ${host}:${port}`);
  })

//==================web_server_end===============================

//==================socket_server===============================
require ('./routes/home')(io)

//==================socket_server_end===============================
