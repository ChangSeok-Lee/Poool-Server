const io = require("socket.io")(server);
const redis = require('socket.io-redis');
//create chatting room
//string roomName, string ownerID, string[] option
//return checkCode
//이미 개설한 채팅룸인지 검증
//설정한 룸 이름으로 채팅룸 개설 --방 정보를 어디에 저장??
exports.newChattingRoom = async(roomName, ownerID, option)=>{
    
}

//join chatting room
//string roomName, string userID
//return checkCode
//userID에 해당하는 사람이 룸 이름의 채팅 subscribe시작
exports.joinChattingRoom = async(roomName, userID, socket) =>{
    socket.join(roomName);
}


//destroy chatting room

//send message
//string roomName, string userID, string message
exports.sendMessage = async(roomName, userID, socket, message) =>{
    socket.to(roomName).emit(message)
}

//receive message
//string roomName, string userID

//send chatting room info

//send chatting room list