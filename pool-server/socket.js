
const redis = require('socket.io-redis');
//chat controller를 import하여 필요한 service를 수행하기

module.exports = (server, app)=>{
    const io = require("socket.io")(server);
    io.adapter(redis({host: 'localhost',port:6379}));
    app.set('io',io);

    const chat=io.of('/chat');
    chat.on('connection',(socket)=>{
        //when client emit 'create room'
        socket.on('create room',(data)=>{
            //room 생성, db에 user가 참가한 방 업데이트
        })
        //when client emit 'join room'
        socket.on('join room',(roomName)=>{
            socket.join(roomName);
            chat.to(roomName).emit("a new user has joined the room");
        })
        //when client emit 'new message'
        socket.on('new message', (data)=>{
            socket.broadcast.emit('new message',{
                username: socket.username,
                message: data
            })
        })
        
        socket.on('add user', () =>{})
        socket.on('disconnect',()=>{})
        socket.on('leave room', (roomName)=>{
            socket.leave(roomName);
            chat.to(roomName).emit("user has left the room");
        })
    })
}