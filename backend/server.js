const express = require("express");
const {addUser, getUser, removeUser} = require("./utils/users");
const app = express();


const server = require("http").createServer(app);
const {Server}= require("socket.io");

const io = new Server(server);

app.get("/",(req,res)=>{res.send("this is whiteboard sharing app")});

let roomIDGlobal, imgURLGlobal;

io.on("connection",(socket) => {
    socket.on("userJoined",(data) =>{
        const {name, userId, roomID, host, presenter} = data;
        roomIDGlobal = roomID;
        socket.join(roomID);
        const users = addUser({name, userId, roomID, host, presenter, socketId: socket.id});   
        socket.emit("userIsJoined",{success:true, users});
        socket.broadcast.to(roomID).emit("userJoinedMessageBroadcasted",name);
        socket.broadcast.to(roomID).emit("allUsers",users); 
        socket.broadcast.to(roomID).emit("whiteBoardDataResponse", {
            imgURL: imgURLGlobal,
        })
    });

    socket.on("message", (data)=> {
        const {message} = data;
        const user = getUser(socket.id);
        if (user) {
        socket.broadcast.to(roomIDGlobal).emit("messageResponse", { message, name: user.name });
        }
    });


    socket.on("disconnect", () => {
        const user = getUser(socket.id);
        console.log("found user");
        if (user) {
        const updatedUsers = removeUser(socket.id);
        console.log(updatedUsers);
          socket.broadcast.to(roomIDGlobal).emit("userLeftMessageBroadcasted", {
            name: user.name,
            userId: user.userId,
            updatedUsers: updatedUsers
          });

          socket.broadcast.to(roomIDGlobal).emit("allUsers",updatedUsers); 
        }

    });

    socket.on("whiteboardData", (data) => {
        imgURLGlobal=data;
        socket.broadcast.to(roomIDGlobal).emit("whiteBoardDataResponse",{
            imgURL:data,
        })
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("server running on http://localhost:5000"));