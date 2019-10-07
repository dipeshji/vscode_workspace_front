
module.exports = (io) => {
    io.on('connection',(socket)=>{
        console.log(`new socket colnnection:${socket.id}`);
        socket.emit('data',"Connection established!")
    })
}

